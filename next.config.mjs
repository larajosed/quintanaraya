/** @type {import('next').NextConfig} */
const nextConfig = {
  // Mantenemos tus redirects aquí
  async redirects() {
    return [
      {
        source: '/',
        destination: '/register',
        permanent: false,
      },
    ];
  },
  // AÑADE ESTO:
  env: {
    NEXT_PUBLIC_GOOGLE_SCRIPT_URL: "https://script.google.com/macros/s/AKfycbxfO00dw4Koc61_p6EITFOYL7-XnHci5gAeKToatsPmvFs3vLVbERBEYOrxW1gi2rzX/exec",
  },
};

export default nextConfig;