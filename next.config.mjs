/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**', // Este wildcard (**) autoriza qualquer hostname.
      },
      {
        protocol: 'http', // Também é uma boa prática autorizar http para dev local
        hostname: '**',
      },
    ],
  },
};
// mudar quando for pra producao para nao permitir dominios externos
export default nextConfig;