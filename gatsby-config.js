module.exports = {
  siteMetadata: {
    title: `GarciaEricN`,
    name: `Eric N. Garcia`,
    siteUrl: `https://garciaericn.com`,
    description: `IBM Software Engineer. Husband to Lindsay, dad of Noah, Eric, and Luke. Outdoor adventurer.`,
    hero: {
      heading: `Personal perspectives.`,
      maxWidth: 652,
    },
    social: [
      {
        name: `twitter`,
        url: `https://twitter.com/garciaericn`,
      },
      {
        name: `github`,
        url: `https://github.com/eng618`,
      },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-theme-notes`,
      options: {
        basePath: `/notes`,
      },
    },
    {
      resolve: "@narative/gatsby-theme-novela",
      options: {
        contentPosts: "content/posts",
        contentAuthors: "content/authors",
        basePath: "/",
        authorsPage: true,
        sources: {
          local: true,
        },
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Eric N. Garcia`,
        short_name: `ENG618`,
        start_url: `/`,
        background_color: `#fff`,
        theme_color: `#c0b3ff`,
        display: `standalone`,
        icon: `src/assets/favicon.png`,
      },
    },
    `gatsby-plugin-offline`,
  ],
}
