import React from 'react'
import { StaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'
import Icon from './icon'

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
  profile: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: rhythm(1 / 2),
  },
  name: {
    color: 'var(--textNormal)',
    paddingBottom: rhythm(1 / 3),
    borderBottom: '2px solid var(--textLink)',
    marginBottom: rhythm(1 / 2),
  },
  snsContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'var(--snsLink)',
    margin: `0 ${rhythm(0.4)}`,
  },
})

const Bio = (data) => {
  const { author, social } = data.site.siteMetadata
  return (
    <div className={styles.root}>
      <Image
        fixed={data.avatar.childImageSharp.fixed}
        alt={author}
        className={styles.profile}
        imgStyle={{
          borderRadius: `50%`,
        }}
      />
      <h4 className={styles.name}>Wataru</h4>
      <p style={{ textAlign: 'center' }}>
        バンクーバー在住4年目のプログラマー。現地のソフトウェア会社でフルスタックデベロッパーとして勤務。自身で作ったサービスで社会貢献したい。永住権申請中。
      </p>
      <div className={styles.snsContainer}>
        {Object.keys(social).map((key) => {
          let uri
          switch (key) {
            case 'email':
              uri = `mailto: ${social[key]}`
              break
            case 'github':
              uri = `https://github.com/${social[key]}`
              break
            case 'twitter':
              uri = `https://twitter.com/${social[key]}`
              break
            case 'facebook':
              uri = `https://www.facebook.com/profile.php?id=${social[key]}`
              break
            case 'website':
              uri = social[key]
              break
            default:
              break
          }
          return (
            <a href={uri} target="_blank" rel="noreferrer" className="sns-link">
              <Icon name={key} className={styles.icon} />
            </a>
          )
        })}
      </div>
    </div>
  )
}

const bioQuery = graphql`
  query BioQuery {
    avatar: file(absolutePath: { regex: "/profile.jpg/" }) {
      childImageSharp {
        fixed(width: 60, height: 60) {
          ...GatsbyImageSharpFixed
        }
      }
    }
    site {
      siteMetadata {
        author
        social {
          twitter
          facebook
          github
          website
          email
        }
      }
    }
  }
`

export default () => <StaticQuery query={bioQuery} render={Bio} />
