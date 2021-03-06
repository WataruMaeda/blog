import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'

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
    borderRadius: 8,
    width: 320,
    marginLeft: 60,
    marginTop: 30,
    padding: '10px 20px',
    boxShadow: 'var(--shadow)',
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
    ({ node: { frontmatter } }) => `${frontmatter.year}-${frontmatter.month}`,
  )
  archives.forEach((x) => {
    grouped[x] = (grouped[x] || 0) + 1
  })
  return grouped
}

const Archives = ({ className }) => ({ allMdx: { edges } }) => {
  const grouped = getArchives(edges)
  return (
    <div className={`${styles.root} ${className}`}>
      <h4 className={styles.header}>アーカイブ</h4>
      <div className={styles.archiveContainer}>
        {Object.keys(grouped).map((key) => {
          const yymm = key.split('-')
          const year = yymm[0]
          const month = yymm[1]
          return (
            <Link to={`/archives/${year}/${month}`} className={styles.link}>
              <p>{`${year}年${month}(${grouped[key]})`}</p>
            </Link>
          )
        })}
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

export default (props) => (
  <StaticQuery query={archiveQuery} render={Archives(props)} />
)
