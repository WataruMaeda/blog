import React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import SearchPosts from "../components/searchPosts"

const IndexPage = ({ data, navigate, location }) => {
  const { allMdx, site, localSearchBlog, categoriesGroup } = data
  const siteTitle = site.siteMetadata.title
  const posts = allMdx.edges

  return (
    <Layout location={location} title={siteTitle}>
      <SEO title="All posts" />
      <Bio />
      <SearchPosts
        posts={posts}
        localSearchBlog={localSearchBlog}
        navigate={navigate}
        location={location}
      />
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    localSearchBlog {
      index
      store
    }
    allMdx(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            description
            thumbnail {
              childImageSharp {
                fluid(maxWidth: 800) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }
    }
    categoriesGroup: allMdx(limit: 2000) {
      group(field: frontmatter___categories) {
        fieldValue
      }
    }
  }
`
