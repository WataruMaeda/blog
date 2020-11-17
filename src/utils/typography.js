import Typography from 'typography'
import JapaneseTypography from 'typography-theme-japanese-tofu'

JapaneseTypography.overrideThemeStyles = () => {
  return {
    'a.gatsby-resp-image-link': {
      boxShadow: `none`,
    },
    a: {
      color: 'var(--textLink)',
    },
    'a.anchor': {
      boxShadow: 'none',
    },
    'a.anchor svg[aria-hidden="true"]': {
      stroke: 'var(--textLink)',
    },
    hr: {
      background: 'var(--hr)',
    },
  }
}

// delete Wordpress2016.googleFonts

const typography = new Typography(JapaneseTypography)

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const { rhythm } = typography
export const { scale } = typography
