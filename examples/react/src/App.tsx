import styles from './App.module.css'
import { createClient } from '@supabase/supabase-js'
import { SocialLayout, ThemeSupa, ViewType } from '@supabase/auth-ui-shared'
import { Auth } from '@supabase/auth-ui-react'
import { useState } from 'react'
import ToggleButton from './ToggleButton'
import MenuIcon from './MenuIcon'

const supabase = createClient(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)

const classes: { [key: string]: string } = {
  'rgb(202, 37, 37)': styles['container-redshadow'],
  'rgb(65, 163, 35)': styles['container-greenshadow'],
  'rgb(8, 107, 177)': styles['container-blueshadow'],
  'rgb(235, 115, 29)': styles['container-orangeshadow'],
}

const colors = [
  'rgb(202, 37, 37)',
  'rgb(65, 163, 35)',
  'rgb(8, 107, 177)',
  'rgb(235, 115, 29)',
] as const

const socialAlignments = ['horizontal', 'vertical'] as const

const radii = ['5px', '10px', '20px'] as const

const views: { id: ViewType; title: string }[] = [
  { id: 'sign_in', title: 'Sign In' },
  { id: 'sign_up', title: 'Sign Up' },
  { id: 'magic_link', title: 'Magic Link' },
  { id: 'forgotten_password', title: 'Forgotten Password' },
  { id: 'update_password', title: 'Update Password' },
]

function App() {
  const [brandColor, setBrandColor] = useState(colors[0] as string)
  const [borderRadius, setBorderRadius] = useState(radii[0] as string)
  const [theme, setTheme] = useState('dark')
  const [socialLayout, setSocialLayout] = useState<SocialLayout>(socialAlignments[1] satisfies SocialLayout)
  const [view, setView] = useState(views[0])

  return (
    <div className="dark:bg-scale-200 bg-scale-100 relative py-2 pb-16">
      <div className="sm:py-18 gap container relative mx-auto grid grid-cols-12 px-6 py-16 md:gap-16 md:py-24 lg:gap-16 lg:px-16 lg:py-24 xl:px-20">
        <div className="relative col-span-12 mb-16 md:col-span-7 md:mb-0 lg:col-span-6">
          <div className="relative lg:mx-auto lg:max-w-md bg-zinc-900">
            <div className={classes[brandColor]}>
              <div className="border-scale-400 bg-scale-300 relative rounded-xl px-8 py-12 drop-shadow-sm">
                <div className="mb-6 flex flex-col gap-6">
                  <div className="flex items-center gap-3">
                    <h1 className="text-scale-1200 text-2xl">
                      Acme Industries
                    </h1>
                  </div>
                  <p className="text-scale-1100 text-auth-widget-test">
                    Sign in today for Supa stuff
                  </p>
                </div>
                <Auth
                  supabaseClient={supabase}
                  view={view.id}
                  appearance={{
                    theme: ThemeSupa,
                    style: {
                      button: {
                        borderRadius: borderRadius,
                        borderColor: 'rgba(0,0,0,0)',
                      },
                    },
                    variables: {
                      default: {
                        colors: {
                          brand: brandColor,
                          brandAccent: `gray`,
                        },
                      },
                    },
                  }}
                  providers={['apple', 'google', 'github']}
                  socialLayout={socialLayout}
                  theme={theme}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-6">
          <div className="!max-w-md">
            <h3 className="text-2xl mb-8">Auth UI React</h3>
            <p className="!mb-0">
              Pre-built auth widgets to get started in minutes.
            </p>
            <p className="text-scale-900 mt-0">
              Customizable authentication UI component with custom themes and
              extensible styles to match your brand and aesthetic
            </p>
            <div className="mb-4 pt-6 flex items-center space-x-2">
              <small>Currently available in Svelte, Solid.js and React</small>
            </div>
          </div>

          <div className="grid gap-8 py-8 lg:grid-cols-2">
            <div className="flex flex-col gap-6">
              <div className="text-scale-1200 text-base">Brand color</div>
              <div className="flex items-center gap-3">
                <ToggleButton
                  selected={brandColor}
                  setSelected={(radius) => {
                    setBrandColor(radius)
                  }}
                  defaultValue={colors[0]}
                  color={colors[0]}
                />
                <ToggleButton
                  selected={brandColor}
                  setSelected={(radius) => {
                    setBrandColor(radius)
                  }}
                  defaultValue={colors[1]}
                  color={colors[1]}
                />
                <ToggleButton
                  selected={brandColor}
                  setSelected={(radius) => {
                    setBrandColor(radius)
                  }}
                  defaultValue={colors[2]}
                  color={colors[2]}
                />
                <ToggleButton
                  selected={brandColor}
                  setSelected={(radius) => {
                    setBrandColor(radius)
                  }}
                  defaultValue={colors[3]}
                  color={colors[3]}
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="text-scale-1200 text-base">Rounded corners</div>
              <div className="flex items-center gap-3">
                <ToggleButton
                  selected={borderRadius}
                  setSelected={(radius) => {
                    setBorderRadius(radius)
                  }}
                  defaultValue={radii[0]}
                  className="rounded-lg border-b-0 border-l-0"
                />
                <ToggleButton
                  selected={borderRadius}
                  setSelected={(radius) => {
                    setBorderRadius(radius)
                  }}
                  defaultValue={radii[1]}
                  className="rounded-xl border-b-0 border-l-0"
                />
                <ToggleButton
                  selected={borderRadius}
                  setSelected={(radius) => {
                    setBorderRadius(radius)
                  }}
                  defaultValue={radii[2]}
                  className="rounded-2xl border-b-0 border-l-0"
                />
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="text-scale-1200 text-base">
                Social Auth Layout
              </div>
              <div className="flex items-center gap-3">
                <ToggleButton
                  selected={socialLayout}
                  setSelected={(socialLayout) => {
                    setSocialLayout(socialLayout as SocialLayout)
                  }}
                  defaultValue={socialAlignments[0]}
                  className="flex items-center justify-center"
                >
                  <MenuIcon className="text-scale-900 dark:text-scale-1100 w-6 rotate-90" />
                </ToggleButton>
                <ToggleButton
                  selected={socialLayout}
                  setSelected={(socialLayout) => {
                    setSocialLayout(socialLayout as SocialLayout)
                  }}
                  defaultValue={socialAlignments[1]}
                  className="flex items-center justify-center"
                >
                  <MenuIcon className="text-scale-900 dark:text-scale-1100 w-6" />
                </ToggleButton>
              </div>
            </div>

            <div className="flex flex-col gap-6">
              <div className="text-scale-1200 text-base">Component View</div>
              <div className="flex items-center gap-3">
                <div>
                  <div className="relative inline-flex self-center">
                    <select
                      defaultValue={view.id}
                      onChange={(e) => { 
                        const vw = views.filter(v => v.id === e.target.value).pop() ?? view
                        setView(vw)
                      }}
                      className="text-lg rounded border-2 border-blue-700 text-gray-600 pl-5 pr-10 h-12 bg-white hover:border-gray-400 appearance-none"
                    >
                      {views.map((v) => (
                        <option key={v.id} value={v.id}>{v.title}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
