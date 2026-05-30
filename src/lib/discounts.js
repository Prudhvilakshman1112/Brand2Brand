/**
 * Brand 2 Brand — Category Discount Configuration
 *
 * Clothing              → 10% off
 * Footwear              → 10% off
 * Accessories (general) → 10% off
 * Accessories → Bags    → 15% off  (exclusive offer)
 */

export const DISCOUNT_RATES = {
  clothing: 0.10,
  footwear: 0.10,
  accessories: 0.10,
};

/** Subcategory-level overrides (takes priority over category rate). */
export const SUBCATEGORY_DISCOUNT_RATES = {
  bags: 0.15,
};

export const DISCOUNT_LABELS = {
  clothing: '10% OFF',
  footwear: '10% OFF',
  accessories: '10% OFF',
};

/** Returns the discount rate (0–1) for a given category + optional subcategory. */
export function getDiscountRate(category, subcategory) {
  if (subcategory && subcategory in SUBCATEGORY_DISCOUNT_RATES) {
    return SUBCATEGORY_DISCOUNT_RATES[subcategory];
  }
  return DISCOUNT_RATES[category] ?? 0;
}

/** Returns the discounted price for a single item price + category + optional subcategory. */
export function applyDiscount(price, category, subcategory) {
  const rate = getDiscountRate(category, subcategory);
  return price * (1 - rate);
}

/**
 * Computes full cart totals with per-category breakdowns.
 *
 * Returns:
 * {
 *   originalTotal    — sum of price × quantity (no discounts)
 *   savingsByCategory — { clothing: N, footwear: N, accessories: N, bags: N }
 *   totalSavings     — sum of all savings
 *   finalTotal       — original minus all savings
 *   itemBreakdown    — same items array with { originalLineTotal, discountedLineTotal, saving } added
 * }
 */
export function computeCartTotals(items) {
  let originalTotal = 0;
  const savingsByCategory = { clothing: 0, footwear: 0, accessories: 0, bags: 0 };

  const itemBreakdown = items.map((item) => {
    const rate = getDiscountRate(item.category, item.subcategory);
    const originalLineTotal = item.price * item.quantity;
    const discountedLineTotal = originalLineTotal * (1 - rate);
    const saving = originalLineTotal - discountedLineTotal;

    originalTotal += originalLineTotal;

    // Bags get their own savings bucket; other accessories go into 'accessories'
    if (item.subcategory === 'bags') {
      savingsByCategory.bags += saving;
    } else if (item.category in savingsByCategory) {
      savingsByCategory[item.category] += saving;
    }

    return {
      ...item,
      rate,
      originalLineTotal,
      discountedLineTotal,
      saving,
    };
  });

  const totalSavings = Object.values(savingsByCategory).reduce((a, b) => a + b, 0);
  const finalTotal = originalTotal - totalSavings;

  return {
    originalTotal,
    savingsByCategory,
    totalSavings,
    finalTotal,
    itemBreakdown,
  };
}

/**
 * Builds the WhatsApp message body for the owner.
 * @param {Array} itemBreakdown — output of computeCartTotals().itemBreakdown
 * @param {object} totals       — { originalTotal, savingsByCategory, totalSavings, finalTotal }
 */
export function buildWhatsAppMessage(itemBreakdown, totals) {
  const fmt = (n) => n.toLocaleString('en-IN');

  const lines = ['🛍️ *NEW ORDER — Brand 2 Brand*', ''];

  itemBreakdown.forEach((item, idx) => {
    const discount = item.rate > 0 ? ` → After ${Math.round(item.rate * 100)}% OFF: ₹${fmt(Math.round(item.discountedLineTotal))}` : '';
    lines.push(
      `${idx + 1}. *${item.name}*`,
      `   Size: ${item.size || 'N/A'} | Colour: ${item.color || 'N/A'} | Qty: ${item.quantity}`,
      `   Price: ₹${fmt(item.price)} × ${item.quantity} = ₹${fmt(item.originalLineTotal)}${discount}`,
      '',
    );
  });

  lines.push('━━━━━━━━━━━━━━━━━━━━');

  // Category savings
  const catNames = {
    clothing: 'Clothing (10% off)',
    footwear: 'Footwear (10% off)',
    accessories: 'Accessories (10% off)',
    bags: 'Bags (15% off — Exclusive)',
  };
  for (const [cat, saving] of Object.entries(totals.savingsByCategory)) {
    if (saving > 0) {
      lines.push(`${catNames[cat]} saved: −₹${fmt(Math.round(saving))}`);
    }
  }

  lines.push(
    `Original Total : ₹${fmt(Math.round(totals.originalTotal))}`,
    `Total Savings  : −₹${fmt(Math.round(totals.totalSavings))}`,
    `*FINAL TOTAL   : ₹${fmt(Math.round(totals.finalTotal))}*`,
    '━━━━━━━━━━━━━━━━━━━━',
    'Please confirm availability & shipping details. Thank you! 🙏',
  );

  return lines.join('\n');
}
