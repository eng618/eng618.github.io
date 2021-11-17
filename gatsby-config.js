module.exports = {
  siteMetadata: {
    title: 'Eric N. Garcia',
    description: 'A personal website',
    keywords: 'gatsby,theme,carbon',
  },
  flags: {
    DEV_SSR: true,
    FAST_DEV: true,
    LMDB_STORE: true,
    PARALLEL_QUERY_RUNNING: true,
    PARALLEL_SOURCING: true,
    PRESERVE_FILE_DOWNLOAD_CACHE: true,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/content/notes`,
      },
    },
    {
      resolve: `gatsby-plugin-page-creator`,
      options: {
        path: `${__dirname}/content/notes`,
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
      },
    },
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
