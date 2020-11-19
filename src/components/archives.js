import React from 'react'
import { Link } from 'gatsby'
import { StaticQuery, graphql } from 'gatsby'
import { rhythm } from '../utils/typography'
import { styler } from '../theme'
import '../theme/app.css'

const styles = styler({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundImage: 'var(--post)',
    background: 'var(--post)',
    borderRadius: rhythm(0.3),
    width: rhythm(13),
    marginLeft: rhythm(2),
    marginTop: rhythm(1),
    padding: rhythm(0.6),
  },
  archiveContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  header: {
    margin: `0 0 ${rhythm(1)}`,
    color: 'var(--textNormal)',
  },
  link: {
    color: 'var(--textNormal)',
  },
})

const getArchives = (edges) => {
  const grouped = {}
  const archives = edges.map(
    ({ node: { frontmatter } }) =>
      `${frontmatter.year}年${frontmatter.month}月`,
  )
  archives.forEach((x) => {
    grouped[x] = (grouped[x] || 0) + 1
  })
  return grouped
}

const Archives = ({ allMdx: { edges } }) => {
  const grouped = getArchives(edges)
  return (
    <div className={styles.root}>
      <h4 className={styles.header}>アーカイブ</h4>
      <div className={styles.archiveContainer}>
        {Object.keys(grouped).map((key) => (
          <Link to="/" className={styles.link}>
            <p>{`${key}(${grouped[key]})`}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}

const archiveQuery = graphql`
  query ArchiveQuery {
    allMdx(sort: { fields: [frontmatter___date], order: DESC }, limit: 1000) {
      edges {
        node {
          frontmatter {
            year: date(formatString: "YYYY")
            month: date(formatString: "MM")
          }
        }
      }
    }
  }
`

export default () => <StaticQuery query={archiveQuery} render={Archives} />
