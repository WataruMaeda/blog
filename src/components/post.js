import React from 'react'
import { Link } from 'gatsby'
import { PropTypes } from 'prop-types'
import Img from 'gatsby-image'
import { rhythm } from '../utils/typography'

// ------------------------------------
// Styles
// ------------------------------------

const styles = {
  root: {
    display: 'flex',
    boxShadow: 'none',
    width: '48%',
  },
  container: {
    backgroundImage: 'var(--post)',
    background: 'var(--post)',
    borderRadius: rhythm(0.3),
    marginBottom: rhythm(1),
    overflow: 'hidden',
    textAlign: 'center',
    width: '100%',
  },
  thumbnail: {
    width: '100%',
  },
  h3: {
    fontSize: rhythm(1),
    fontWeight: 'normal',
    margin: `${rhythm(1 / 2)} ${rhythm(1 / 2)} ${rhythm(1 / 4)}`,
  },
  small: {
    color: 'var(--textNormal)',
    margin: `0 ${rhythm(1 / 2)} ${rhythm(1)}`,
  },
  p: {
    color: 'var(--textNormal)',
    margin: `0 ${rhythm(1 / 2)} ${rhythm(1 / 4)}`,
  },
}

// ------------------------------------
// Helpers
// ------------------------------------

const getFluid = (thumbnail) => {
  if (!thumbnail) return null
  if (!thumbnail.childImageSharp) return null
  return thumbnail.childImageSharp.fluid
}

// ------------------------------------
// Classes
// ------------------------------------

const Post = ({ thumbnail, slug, title, date, description, excerpt }) => {
  const fluid = getFluid(thumbnail)
  return (
    <Link style={styles.root} to={`${slug}`}>
      <div key={slug} style={styles.container}>
        <h3 style={styles.h3}>{title}</h3>
        <small style={styles.small}>{date}</small>
        {fluid && <Img fluid={fluid} style={styles.thumbnail} alt={title} />}
        <p
          style={styles.p}
          dangerouslySetInnerHTML={{
            __html: description || excerpt,
          }}
        />
      </div>
    </Link>
  )
}

Post.propTypes = {
  props: PropTypes.shape({}),
}

Post.defaultProps = {
  props: {},
}

export default Post
