exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const notesTemplate = require.resolve(`./src/templates/noteTemplate.js`);

  const result = await graphql(`
    {
      allFile(filter: { sourceInstanceName: { eq: "notes" } }) {
        edges {
          node {
            childMdx {
              slug
            }
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allFile.edges.forEach(({ node }) => {
    createPage({
      path: `notes/${node.childMdx.slug}`,
      component: notesTemplate,
      context: {
        // additional data can be passed via context
        slug: node.childMdx.slug,
      },
    });
  });
};
