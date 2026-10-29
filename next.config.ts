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
      // The @gv-tech/ui-web package sources import sibling components via
      // @/./button-style paths that must resolve within the package's own src/,
      // not the host project's src/ (which is Next.js's default @/ alias).
      '@/./button': './node_modules/@gv-tech/ui-web/src/button',
      '@/./separator': './node_modules/@gv-tech/ui-web/src/separator',
      '@/./input': './node_modules/@gv-tech/ui-web/src/input',
      '@/./textarea': './node_modules/@gv-tech/ui-web/src/textarea',
      '@/./label': './node_modules/@gv-tech/ui-web/src/label',
      '@/./sheet': './node_modules/@gv-tech/ui-web/src/sheet',
      '@/./skeleton': './node_modules/@gv-tech/ui-web/src/skeleton',
      '@/./tooltip': './node_modules/@gv-tech/ui-web/src/tooltip',
      '@/./toggle': './node_modules/@gv-tech/ui-web/src/toggle',
      '@/./dialog': './node_modules/@gv-tech/ui-web/src/dialog',
      '@/./input-group': './node_modules/@gv-tech/ui-web/src/input-group',
      '@/hooks/use-mobile': './node_modules/@gv-tech/ui-web/src/hooks/use-mobile',
    },
  },
};

export default nextConfig;
