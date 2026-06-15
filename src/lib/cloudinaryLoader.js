// src/lib/cloudinaryLoader.js
export default function cloudinaryLoader({ src, width }) {
  // Enforce q_auto regardless of Next.js quality prop for max bandwidth savings
  const params = ['f_auto', 'c_limit', `w_${width}`, 'q_auto'];

  // If the image is already a Cloudinary URL, we inject the transformations
  if (src.includes('res.cloudinary.com')) {
    return src.replace('/upload/', `/upload/${params.join(',')}/`);
  }

  // Fallback for local or legacy Supabase images (won't be optimized by Cloudinary)
  return src;
}
