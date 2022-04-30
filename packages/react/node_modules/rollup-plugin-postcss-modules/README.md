[![NPM Version]](https://www.npmjs.com/package/rollup-plugin-postcss-modules)
[![Build Status]](https://travis-ci.org/flying-sheep/rollup-plugin-postcss-modules)

[NPM Version]: https://img.shields.io/npm/v/rollup-plugin-postcss-modules.svg?style=flat
[Build Status]: https://travis-ci.org/flying-sheep/rollup-plugin-postcss-modules.svg?branch=master

rollup-plugin-postcss-modules
=============================

Use the option `modules: { ... }` to pass [options](https://github.com/css-modules/postcss-modules#usage)
to the [`postcss-modules`](https://github.com/css-modules/postcss-modules) plugin.

With `rollup-plugin-postcss` 2.0, the only continued advantage this one has is TypeScript support.

One new option exists:

* `writeDefinitions: true` creates `.css.d.ts` files next to every processed `.css` file.

Also the default `namedExports` option is slightly different:

* `.class-name { ... } .switch { ... }` gets converted to something like

    ```typescript
	export const className = 'class-name'
	export const $switch$ = 'switch'
	export default {
		'class-name': 'class-name',
		className: 'class-name',
		'switch': 'switch',
		$switch$: 'switch',
	}
	```

Example
-------

see [here](https://github.com/flying-sheep/rollup-plugin-postcss-modules-example) for a clonable repo.

`rollup.config.js`:
```javascript
import postcss from 'rollup-plugin-postcss-modules'
import typescript from 'rollup-plugin-typescript2'

import autoprefixer from 'autoprefixer'

export default {
	entry: 'src/index.tsx',
	dest: 'dist/bundle.js',
	format: 'iife',
	plugins: [
		postcss({
			extract: true,  // extracts to `${basename(dest)}.css`
			plugins: [autoprefixer()],
			writeDefinitions: true,
			// modules: { ... }
		}),
		typescript(),
	],
}
```

`index.html`
```html
<!doctype html>
<script src=dist/bundle.js></script>
<link rel=stylesheet href=dist/bundle.css>

<main id=main></main>
```

`src/index.tsx`:
```typescript
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import MyComponent from './components/my-component'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(<MyComponent/>, document.querySelector('#main'))
})
```

`src/components/my-component.tsx`:
```typescript
import * as React from 'react'

import style from './my-component.css'

export default class MyClass extends React.Component<{}, {}> {
    render() {
        return <div className={style.myClass} />
    }
}
```

`src/components/my-component.css`:
```css
.my-class { ... }
```
