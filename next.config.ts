import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos uploaded from the admin's Master Catalog are hosted in Supabase Storage —
    // see demo-ra-jewellers' README "Public website (Supabase sync)".
    remotePatterns: [{ protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" }],
  },
};

export default nextConfig;
