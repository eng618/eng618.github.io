import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  transpilePackages: ['@gv-tech/ui-web', '@gv-tech/ui-core', '@gv-tech/design-tokens'],
  turbopack: {
    resolveAlias: {
      // Use shipped src/ to bypass the dist bundles, which contain rolldown's
      // require() shims that break Turbopack's SSR/prerender pipeline.
      '@gv-tech/ui-web': './node_modules/@gv-tech/ui-web/src/index.ts',
      '@gv-tech/ui-core': './node_modules/@gv-tech/ui-core/src/index.ts',
      '@gv-tech/design-tokens': './node_modules/@gv-tech/design-tokens/src/index.ts',
    },
  },
};

export default nextConfig;
