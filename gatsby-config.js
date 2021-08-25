module.exports = {
  siteMetadata: {
    siteUrl: 'https://www.ellyloel.com',
    title: 'Elly Loel',
    description: 'My little corner of the internet.',
    author: 'Elly Loel',
  },
  plugins: [
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `notes`,
        path: `${__dirname}/content/notes/`,
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
        gatsbyRemarkPlugins: [
          {
            resolve: 'gatsby-remark-double-brackets-link',
            options: {
              titleToURLPath: `${__dirname}/resolve-url.js`,
              stripBrackets: true,
            },
          },
        ],
      },
    },
    `gatsby-plugin-catch-links`,
    {
      resolve: `gatsby-transformer-markdown-references`,
      options: {
        types: ['Mdx'], // or ['RemarkMarkdown'] (or both)
      },
    },
    `gatsby-plugin-styled-components`,
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: /svg/,
        },
      },
    },
    {
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [`Raleway:400,400i,600,800,800i`],
        display: 'swap',
      },
    },
  ],
};
