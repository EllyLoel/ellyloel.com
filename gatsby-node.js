exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const notesTemplate = require.resolve(`./src/templates/noteTemplate.js`);

  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { slug: { ne: null } } }) {
        nodes {
          frontmatter {
            slug
            title
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMdx.nodes.forEach((node) => {
    createPage({
      path: `notes/${node.frontmatter.slug}`,
      component: notesTemplate,
      context: {
        // additional data can be passed via context
        slug: node.frontmatter.slug,
        title: node.frontmatter.title,
      },
    });
  });
};
