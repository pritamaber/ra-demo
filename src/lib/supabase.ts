// Read-only PostgREST client for the Supabase mirror the admin app (demo-ra-jewellers) pushes to —
// see that repo's README "Public website (Supabase sync)" section. No SDK needed for plain reads.
//
// SUPABASE_URL / SUPABASE_SERVICE_KEY (same two values already in demo-ra-jewellers/.env — this is the
// same Supabase project) are deliberately NOT prefixed NEXT_PUBLIC_: every call to sbSelect() happens
// from a Server Component (page.tsx / GoldRateBar.tsx, no "use client"), so these never reach the
// browser bundle. Do not import this module from a "use client" file, and don't rename these to
// NEXT_PUBLIC_* — that would inline the key into client-side JS. Set both in .env.local for local dev
// and in the Vercel project's Environment Variables for the deployed site.
const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_KEY;

export const supabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_KEY);

/** Selects rows from a public Supabase table. Returns [] (never throws) if unconfigured or unreachable,
 *  so the site still renders — callers fall back to demo content. Revalidated every 60s (ISR) so an
 *  admin edit shows up on the live site within a minute without a redeploy. */
export async function sbSelect<T>(table: string, query = ""): Promise<T[]> {
  if (!supabaseConfigured) return [];
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/${table}${query}`, {
      headers: { apikey: SUPABASE_KEY!, Authorization: `Bearer ${SUPABASE_KEY}` },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    return (await res.json()) as T[];
  } catch {
    return [];
  }
}
