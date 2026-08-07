import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/cards/ronaldo-legacy-june-2026",
        destination: "/cards/ronaldo-legacy-march-2026",
        permanent: true,
      },
      {
        source: "/updates/summer-update-16",
        destination: "/updates/july-4-summer-admin-event",
        permanent: true,
      },
      {
        source:
          "/cards/:slug(neymar-rebirth-report|allison-rebirth-report|mbappe-rebirth-report|haaland-rebirth-report|turnly-endgame-report|abilian-endgame-report)",
        destination: "/cards",
        permanent: true,
      },
      {
        source: "/packs/champions-pack",
        destination: "/packs",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
