import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  transpilePackages: ['@gv-tech/ui-web', '@gv-tech/ui-core', '@gv-tech/design-tokens'],
};

export default nextConfig;
