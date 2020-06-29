import React from "react"
import { graphql, Link } from "gatsby"

const Blogs = ({
  data: {
    allMarkdownRemark: { nodes: blogs },
  },
}) => {
  console.log(blogs)
  return (
    <div>
      <h1>List of blogs</h1>
      {blogs.map(item => {
        return (
          <div style={{ border: "1px solid black", padding: "1rem" }}>
            <h3>{item.frontmatter.title}</h3>
            <Link to={`/blogs/${item.frontmatter.path}`}>See Blog</Link>
          </div>
        )
      })}
    </div>
  )
}

export const query = graphql`
  {
    allMarkdownRemark {
      nodes {
        frontmatter {
          path
          title
        }
      }
    }
  }
`

export default Blogs
