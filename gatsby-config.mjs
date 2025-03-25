import { join } from 'path';
import { cwd } from 'process';

export default {
  siteMetadata: {
    title: 'Eric N. Garcia',
    description: 'A personal website',
    keywords: 'gatsby,theme,carbon',
    siteUrl: `https://garciaericn.com`,
  },
  flags: {
    // DETECT_NODE_MUTATIONS: true,
    DEV_SSR: true,
    FAST_DEV: true,
    PARALLEL_SOURCING: true,
    PRESERVE_WEBPACK_CACHE: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: join(cwd(), 'content', 'notes'),
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: join(cwd(), 'content', 'notes'),
      },
    },
    {
      resolve: 'gatsby-theme-carbon',
      options: {
        iconPath: './src/images/icon-v2.png',
        titleType: 'prepend',
        shortName: 'ENG618',
        withWebp: true,
        repository: {
          baseUrl: 'https://github.com/eng618/engarcia.github.io',
          branch: 'develop',
        },
        isSwitcherEnabled: false,
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'downloads',
              ignoreFileExtensions: ['png', 'jpg', 'jpeg', 'bmp', 'tiff', 'md'],
            },
          },
        ],
      },
    },
    // {
    //   resolve: 'gatsby-transformer-remark',
    //   options: {
    //     plugins: [
    //       {
    //         resolve: `gatsby-remark-copy-linked-files`,
    //         destinationDir: (f) => `download/${f.name}+${f.hash}`,
    //         ignoreFileExtensions: [`png`, `jpg`, `jpeg`, `bmp`, `tiff`, `md`],
    //       },
    //     ],
    //   },
    // },
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: 'Eric N. Garcia',
        short_name: 'ENG618',
        start_url: '/',
        background_color: '#505050',
        theme_color: '#9C8BFF',
        display: 'standalone',
        cache_busting_mode: 'none',
        icon: './src/images/icon-v2.png',
      },
    },
    'gatsby-plugin-offline',
  ],
};
