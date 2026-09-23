// Matches the admin app's own slugify exactly (src/images.js in demo-ra-jewellers), so a category
// name like "Nose Pin" always slugifies to the same "nose-pin" on both sides.
export function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}
