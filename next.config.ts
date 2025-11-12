// Allow accessing the dev server from your LAN IP (e.g., 172.22.16.1)
// This silences the Cross origin request warning and ensures HMR/assets work when
// opening the site from another device on your network. Dev-only setting.
const nextConfig = {
  experimental: {
    // Add any origins you use to open the dev site in a browser
    // Include protocol and port. Adjust the IP if your LAN address changes.
    allowedDevOrigins: [
      "http://localhost:3000",
      "http://172.22.16.1:3000",
    ],
  },
};

export default nextConfig;
