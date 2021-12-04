exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;

  const NotesTemplate = require.resolve(`./src/templates/noteTemplate.js`);

  const result = await graphql(`
    {
      allMdx(filter: { frontmatter: { slug: { ne: null } } }) {
        nodes {
          frontmatter {
            slug
          }
        }
      }
      allFile(filter: { internal: { description: { regex: "/notes/" } } }) {
        nodes {
          internal {
            content
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  result.data.allMdx.nodes.forEach((node, index) => {
    createPage({
      path: `notes/${node.frontmatter.slug}`,
      component: NotesTemplate,
      context: {
        slug: node.frontmatter.slug,
        content: result.data.allFile.nodes[index].internal.content,
      },
    });
  });
};
