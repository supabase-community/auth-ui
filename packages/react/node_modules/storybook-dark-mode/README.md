# storybook-dark-mode

A storybook addons that lets your users toggle between dark and light mode.

![Example](./example.gif)

## Installation

Install the following npm module:

```sh
npm i --save-dev storybook-dark-mode
```

or with yarn:

```sh
yarn add -D storybook-dark-mode
```

Then, add following content to `.storybook/main.js`

```js
module.exports = {
  addons: ['storybook-dark-mode']
};
```

## Configuration

Configure the dark and light mode by adding the following to your `.storybook/preview.js` file:

```js
import { themes } from '@storybook/theming';

export const parameters = {
  darkMode: {
    // Override the default dark theme
    dark: { ...themes.dark, appBg: 'black' },
    // Override the default light theme
    light: { ...themes.normal, appBg: 'red' }
  }
};
```

### Default Theme

Order of precedence for the initial color scheme:

1. If the user has previously set a color theme it's used
2. The value you have configured for `current` parameter in your storybook
3. The OS color scheme preference

Once the initial color scheme has been set, subsequent reloads will use this value.
To clear the cached color scheme you have to `localStorage.clear()` in the chrome console.

```js
export const parameters = {
  darkMode: {
    // Set the initial theme
    current: 'light'
  }
};
```

### Dark/Light Class

This plugin will apply a dark and light class name to the manager.
This allows you to easily write dark mode aware theme overrides for the storybook UI.

You can override the classNames applied when switching between light and dark mode using the `darkClass` and `lightClass` parameters.

```js
export const parameters = {
  darkMode: {
    darkClass: 'lights-out',
    lightClass: 'lights-on'
  }
};
```

### Preview class target

This plugin will apply the dark/light class to the `<body>` element of the preview iframe. This can be configured with the `classTarget` parameter.
The value will be passed to a `querySelector()` inside the iframe.

This is useful if the `<body>` is styled according to a parent's class, in that case it can be set to `html`.

```js
export const parameters = {
  darkMode: {
    classTarget: 'html'
  }
};
```

## Story integration

### Preview ClassName

This plugin will apply the `darkClass` and `lightClass` classes to the preview iframe if you turn on the `stylePreview` option.

```js
export const parameters = {
  darkMode: {
    stylePreview: true
  }
};
```

### React

If your components use a custom Theme provider, you can integrate it by using the provided hook.

```js
import { useDarkMode } from 'storybook-dark-mode';
import { addDecorator } from '@storybook/react';

// your theme provider
import ThemeContext from './theme';

// create a component that uses the dark mode hook
function ThemeWrapper(props) {
  // render your custom theme provider
  return (
    <ThemeContext.Provider value={useDarkMode() ? darkTheme : defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const decorators = [renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>)];
```

#### Theme Knobs

If you want to have you UI's dark mode separate from you components' dark mode, implement this global decorator:

```js
import { themes } from '@storybook/theming';

// Add a global decorator that will render a dark background when the
// "Color Scheme" knob is set to dark
const knobDecorator = storyFn => {
  // A knob for color scheme added to every story
  const colorScheme = select('Color Scheme', ['light', 'dark'], 'light');

  // Hook your theme provider with some knobs
  return React.createElement(ThemeProvider, {
    // A knob for theme added to every story
    theme: select('Theme', Object.keys(themes), 'default'),
    colorScheme,
    children: [
      React.createElement('style', {
        dangerouslySetInnerHTML: {
          __html: `html { ${
            colorScheme === 'dark' ? 'background-color: rgb(35,35,35);' : ''
          } }`
        }
      }),
      storyFn()
    ]
  });
};

export const decorators = [knobDecorator];
```

### Events

You can also listen for the `DARK_MODE` event via the addons channel.

```js
import addons from '@storybook/addons';
import { addDecorator } from '@storybook/react';
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode';

// your theme provider
import ThemeContext from './theme';

// get channel to listen to event emitter
const channel = addons.getChannel();

// create a component that listens for the DARK_MODE event
function ThemeWrapper(props) {
  // this example uses hook but you can also use class component as well
  const [isDark, setDark] = useState(false);

  useEffect(() => {
    // listen to DARK_MODE event
    channel.on(DARK_MODE_EVENT_NAME, setDark);
    return () => channel.off(DARK_MODE_EVENT_NAME, setDark);
  }, [channel, setDark]);

  // render your custom theme provider
  return (
    <ThemeContext.Provider value={isDark ? darkTheme : defaultTheme}>
      {props.children}
    </ThemeContext.Provider>
  );
}

export const decorators = [renderStory => <ThemeWrapper>{renderStory()}</ThemeWrapper>)];
```

Since in docs mode, Storybook will not display its toolbar,
You can also trigger the `UPDATE_DARK_MODE` event via the addons channel if you want to control that option in docs mode,
By editing your `.storybook/preview.js`.

```js
import React from 'react';
import addons from '@storybook/addons';
import { DocsContainer } from '@storybook/addon-docs';
import { themes } from '@storybook/theming';

import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME
} from 'storybook-dark-mode';

const channel = addons.getChannel();

export const parameters = {
  darkMode: {
    current: 'light',
    dark: { ...themes.dark },
    light: { ...themes.light }
  },
  docs: {
    container: props => {
      const [isDark, setDark] = React.useState();

      const onChangeHandler = () => {
        channel.emit(UPDATE_DARK_MODE_EVENT_NAME);
      };

      React.useEffect(() => {
        channel.on(DARK_MODE_EVENT_NAME, setDark);
        return () => channel.removeListener(DARK_MODE_EVENT_NAME, setDark);
      }, [channel, setDark]);

      return (
        <div>
          <input type="checkbox" onChange={onChangeHandler} />
          <DocsContainer {...props} />
        </div>
      );
    }
  }
};
```

## Contributors ✨

Thanks goes to these wonderful people ([emoji key](https://allcontributors.org/docs/en/emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tr>
    <td align="center"><a href="http://hipstersmoothie.com"><img src="https://avatars3.githubusercontent.com/u/1192452?v=4" width="100px;" alt=""/><br /><sub><b>Andrew Lisowski</b></sub></a><br /><a href="#question-hipstersmoothie" title="Answering Questions">💬</a> <a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=hipstersmoothie" title="Code">💻</a> <a href="#design-hipstersmoothie" title="Design">🎨</a> <a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=hipstersmoothie" title="Documentation">📖</a> <a href="#ideas-hipstersmoothie" title="Ideas, Planning, & Feedback">🤔</a> <a href="#infra-hipstersmoothie" title="Infrastructure (Hosting, Build-Tools, etc)">🚇</a> <a href="#maintenance-hipstersmoothie" title="Maintenance">🚧</a></td>
    <td align="center"><a href="https://trutoo.com/people/erik-hughes"><img src="https://avatars3.githubusercontent.com/u/455178?v=4" width="100px;" alt=""/><br /><sub><b>Erik Hughes</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=Swiftwork" title="Code">💻</a></td>
    <td align="center"><a href="https://adamyonk.com"><img src="https://avatars3.githubusercontent.com/u/33258?v=4" width="100px;" alt=""/><br /><sub><b>Adam Jahnke</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=adamyonk" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/carlesnunez"><img src="https://avatars3.githubusercontent.com/u/5639972?v=4" width="100px;" alt=""/><br /><sub><b>Carles Núñez</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=carlesnunez" title="Code">💻</a></td>
    <td align="center"><a href="https://adamdierkens.com"><img src="https://avatars1.githubusercontent.com/u/13004162?v=4" width="100px;" alt=""/><br /><sub><b>Adam Dierkens</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=adierkens" title="Code">💻</a></td>
    <td align="center"><a href="http://skarhed.com"><img src="https://avatars2.githubusercontent.com/u/1438972?v=4" width="100px;" alt=""/><br /><sub><b>Tobias Skarhed</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=tskarhed" title="Code">💻</a> <a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=tskarhed" title="Documentation">📖</a></td>
    <td align="center"><a href="https://fatihkalifa.com"><img src="https://avatars3.githubusercontent.com/u/1614415?v=4" width="100px;" alt=""/><br /><sub><b>Fatih Kalifa</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=pveyes" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://www.jacobcoughenour.com"><img src="https://avatars1.githubusercontent.com/u/5546400?v=4" width="100px;" alt=""/><br /><sub><b>Jacob Coughenour</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=jacobcoughenour" title="Code">💻</a></td>
    <td align="center"><a href="http://twitter.com/jpzwarte"><img src="https://avatars1.githubusercontent.com/u/3968?v=4" width="100px;" alt=""/><br /><sub><b>Jeroen Zwartepoorte</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=jpzwarte" title="Documentation">📖</a> <a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=jpzwarte" title="Code">💻</a></td>
    <td align="center"><a href="https://claritydev.net"><img src="https://avatars0.githubusercontent.com/u/8878045?v=4" width="100px;" alt=""/><br /><sub><b>Alex Khomenko</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=Clarity-89" title="Code">💻</a></td>
    <td align="center"><a href="https://www.linkedin.com/in/paulfasola/"><img src="https://avatars.githubusercontent.com/u/1634645?v=4" width="100px;" alt=""/><br /><sub><b>Paul Fasola</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=PaulFasola" title="Documentation">📖</a></td>
    <td align="center"><a href="https://pavelkeyzik.com"><img src="https://avatars.githubusercontent.com/u/17102399?v=4" width="100px;" alt=""/><br /><sub><b>Pavel Keyzik</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=pavelkeyzik" title="Documentation">📖</a></td>
    <td align="center"><a href="https://dricholm.github.io/"><img src="https://avatars.githubusercontent.com/u/32329112?v=4" width="100px;" alt=""/><br /><sub><b>David Richolm</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=dricholm" title="Documentation">📖</a> <a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=dricholm" title="Code">💻</a></td>
    <td align="center"><a href="http://klausnygard.fi"><img src="https://avatars.githubusercontent.com/u/2855908?v=4" width="100px;" alt=""/><br /><sub><b>Klaus Nygård</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=nygardk" title="Code">💻</a></td>
  </tr>
  <tr>
    <td align="center"><a href="https://artmsilva.com"><img src="https://avatars.githubusercontent.com/u/347490?v=4" width="100px;" alt=""/><br /><sub><b>Arturo Silva</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=artmsilva" title="Documentation">📖</a> <a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=artmsilva" title="Code">💻</a></td>
    <td align="center"><a href="http://nikkipantony.com"><img src="https://avatars.githubusercontent.com/u/3025322?v=4" width="100px;" alt=""/><br /><sub><b>Nikki Pantony</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=nikkipantony" title="Documentation">📖</a> <a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=nikkipantony" title="Code">💻</a></td>
    <td align="center"><a href="https://github.com/IanVS"><img src="https://avatars.githubusercontent.com/u/4616705?v=4" width="100px;" alt=""/><br /><sub><b>Ian VanSchooten</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=IanVS" title="Code">💻</a></td>
    <td align="center"><a href="http://design.talend.com/"><img src="https://avatars.githubusercontent.com/u/18534166?v=4" width="100px;" alt=""/><br /><sub><b>Fabien</b></sub></a><br /><a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=frassinier" title="Documentation">📖</a> <a href="https://github.com/hipstersmoothie/storybook-dark-mode/commits?author=frassinier" title="Code">💻</a></td>
  </tr>
</table>

<!-- markdownlint-enable -->
<!-- prettier-ignore-end -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/all-contributors/all-contributors) specification. Contributions of any kind welcome!
