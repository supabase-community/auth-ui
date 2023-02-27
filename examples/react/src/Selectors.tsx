import styles from './App.module.css'
import Logo from './assets/react.svg'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Circle from '@mui/icons-material/Circle'
import RoundedCorner from '@mui/icons-material/RoundedCorner'
import RoundedCornerRounded from '@mui/icons-material/RoundedCornerRounded'
import RoundedCornerSharp from '@mui/icons-material/RoundedCornerSharp'
import HorizontalIcon from '@mui/icons-material/AlignHorizontalCenterRounded'
import VerticalIcon from '@mui/icons-material/AlignVerticalCenterRounded'
import { useData } from './store'
import { SocialLayout } from '@supabase/auth-ui-shared'

function Selectors() {
  return (
    <div className={styles['selectors-container']}>
      <h2>Auth UI React</h2>
      <p>
        Customizable authentication UI component with custom themes and
        extensible styles to match your brand and aesthetic
      </p>
      <div className={styles.solidrow}>
        <img src={Logo} alt="React Logo" height={32} />
        <p>
          Currently available in Solid.js and{' '}
          <a href="https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#predefined-themes">
            React
          </a>
        </p>
      </div>
      <div className={styles['toggles-grid']}>
        <ColorToggles />
        <RadiusToggles />
        <AlignmentToggles />
      </div>
    </div>
  )
}

export function AlignmentToggles() {
  const { socialLayout } = useData()
  const [customSocialLayout, setCustomSocialLayout] = socialLayout

  function handleChange(e: React.MouseEvent, newAlignment: SocialLayout) {
    if (newAlignment !== null) {
      setCustomSocialLayout(newAlignment)
    }
  }

  return (
    <div>
      <h5>Social Auth Layout</h5>
      <ToggleButtonGroup
        value={customSocialLayout}
        onChange={handleChange}
        exclusive
      >
        <ToggleButton value={socialAlignment.horizontal}>
          <VerticalIcon style={{ color: 'white' }} />
        </ToggleButton>
        <ToggleButton value={socialAlignment.vertical}>
          <HorizontalIcon style={{ color: 'white' }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export function RadiusToggles() {
  const { borderRadius } = useData()
  const [customBorderRadius, setCustomBorderRadius] = borderRadius

  function handleChange(e: React.MouseEvent, newRadius: string) {
    if (newRadius !== null) {
      setCustomBorderRadius(newRadius)
    }
  }

  return (
    <div>
      <h5>Rounded Corners</h5>
      <ToggleButtonGroup
        value={customBorderRadius}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value={radii.small}>
          <RoundedCornerSharp style={{ color: 'white' }} />
        </ToggleButton>
        <ToggleButton value={radii.medium}>
          <RoundedCorner style={{ color: 'white' }} />
        </ToggleButton>
        <ToggleButton value={radii.large}>
          <RoundedCornerRounded style={{ color: 'white' }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export function ColorToggles() {
  const { buttonColor } = useData()
  const [customButtonColor, setCustomButtonColor] = buttonColor

  function handleChange(e: React.MouseEvent, newColor: string) {
    if (newColor !== null) {
      setCustomButtonColor(newColor)
    }
  }

  return (
    <div>
      <h5>Brand Color</h5>
      <ToggleButtonGroup
        value={customButtonColor}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value={colors.red}>
          <Circle style={{ color: colors.red }} />
        </ToggleButton>
        <ToggleButton value={colors.green}>
          <Circle style={{ color: colors.green }} />
        </ToggleButton>
        <ToggleButton value={colors.blue}>
          <Circle style={{ color: colors.blue }} />
        </ToggleButton>
        <ToggleButton value={colors.orange}>
          <Circle style={{ color: colors.orange }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  )
}

export default Selectors

const colors = {
  red: 'rgb(202, 37, 37)',
  green: 'rgb(65, 163, 35)',
  blue: 'rgb(8, 107, 177)',
  orange: 'rgb(235, 115, 29)',
}

const radii = {
  small: '5px',
  medium: '10px',
  large: '20px',
}

const socialAlignment = {
  horizontal: 'horizontal',
  vertical: 'vertical',
}

const theme = {
  light: 'light',
  dark: 'dark',
}
