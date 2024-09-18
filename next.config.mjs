/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/settings",
        destination: "/settings/user",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
