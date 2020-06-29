const path = require("path")
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = require.resolve(`./src/templates/blogTemplate.js`)

  const result = await graphql(`
    {
      blogs: allMarkdownRemark {
        nodes {
          frontmatter {
            slug: path
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.blogs.nodes.forEach(blog => {
    createPage({
      path: `/blogs/${blog.frontmatter.slug}`,
      component: blogPostTemplate,
      context: {
        // additional data can be passed via context
        slug: blog.frontmatter.slug,
      },
    })
  })
}
