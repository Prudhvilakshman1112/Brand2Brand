'use client';

import { useCart } from '@/context/CartContext';

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, subtotal } = useCart();

  return (
    <>
      <div
        className={`cart-drawer-overlay ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(false)}
      />
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`} id="cart-drawer">
        <div className="cart-drawer-header">
          <h3>YOUR BAG ({items.reduce((s, i) => s + i.quantity, 0)})</h3>
          <button
            className="cart-drawer-close"
            onClick={() => setIsOpen(false)}
            aria-label="Close cart"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {items.length === 0 ? (
          <div className="cart-empty">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
              <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            <p>Your bag is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-drawer-items">
              {items.map(item => (
                <div className="cart-item" key={item.cartId}>
                  <div className="cart-item-image">
                    <div style={{
                      width: '100%',
                      height: '100%',
                      background: 'linear-gradient(135deg, #e0e0e0 0%, #c0c0c0 100%)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.6rem',
                      color: '#888',
                      textAlign: 'center',
                      padding: '4px',
                      fontFamily: 'var(--font-body)',
                    }}>
                      {item.name.split(' ').slice(0, 2).join(' ')}
                    </div>
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-name">{item.name}</div>
                    <div style={{ fontSize: '0.75rem', color: '#999', marginBottom: '2px' }}>
                      {item.size && `Size: ${item.size}`}
                      {item.color && ` | ${item.color}`}
                    </div>
                    <div className="cart-item-price">₹{item.price.toLocaleString()}</div>
                    <div className="cart-item-qty">
                      <button onClick={() => updateQuantity(item.cartId, item.quantity - 1)}>−</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.cartId, item.quantity + 1)}>+</button>
                    </div>
                    <button
                      className="cart-item-remove"
                      onClick={() => removeItem(item.cartId)}
                      style={{ marginTop: '4px' }}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="cart-drawer-footer">
              <div className="cart-subtotal">
                <span className="cart-subtotal-label">SUBTOTAL</span>
                <span className="cart-subtotal-amount">₹{subtotal.toLocaleString()}</span>
              </div>
              <button className="btn-magnetic cart-checkout-btn" id="checkout-btn">
                CHECKOUT
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
