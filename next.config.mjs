/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
  sassOptions: {
    includePaths: [path.join(__dirname, 'styles')],
  },
  compiler: {
    styledComponents: true,
  },
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'http',
  //       hostname: 'localhost',
  //       port: '4000',
  //       // pathname: '/account123/**',
  //     },
  //   ],
  // },
  images: {
    domains: ['http://localhost:4000', 'http://195.133.73.86:3000/'], // Указываем разрешенные домены для внешних изображений
    remotePatterns: [
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '4000',
      //   pathname: '/images/**',
      // },
      {
        protocol: 'http',
        hostname: '195.133.73.86',
        port: '4000',
        pathname: '/images/**',
      },
    ],
  },
};

export default nextConfig;
