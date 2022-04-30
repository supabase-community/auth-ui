# rollup-plugin-node-externals

A Rollup plugin that automatically declares NodeJS built-in modules as `external`. Can also handle npm dependencies, devDependencies, peerDependencies and optionalDependencies. Works in monorepos too!

## Why?

By default, Rollup doesn't know a thing about NodeJS, so trying to bundle simple things like `import * as path from 'path'` in your code generates an `Unresolved dependencies` error. The solution here is twofold:
* Either use some kind of shim like those provided by [rollup-plugin-node-builtins](https://github.com/calvinmetcalf/rollup-plugin-node-builtins).
* Or tell Rollup that the `path` module is in fact `external`: this way, Rollup won't try to bundle it in and rather leave the `import` statement as is (or translate it to a `require()` call if bundling for CommonJS).

However, this must be done for each and every NodeJS built-in: `path`, `os`, `fs`, etc., which can quicky become cumbersome when done manually. So the primary goal of this plugin is simply to automatically declare all NodeJS built-in modules as `external`.
> Note: the list of builtins is obtained via [the builtin-modules package](https://github.com/sindresorhus/builtin-modules) by Sindre Sorhus and should be up-to-date with your current NodeJS version.

This plugin will also allow you to declare your dependencies (as declared in your `package.json` file) as `external`. This may come in handy when building an [Electron](https://electronjs.org) app, for example.


## Install

```sh
npm install --save-dev rollup-plugin-node-externals
```


## Usage

```js
import externals from 'rollup-plugin-node-externals'

export default {
  input: { ... },
  output: { ... },
  plugins: [
    externals({
      // The path(s) to your package.json. Optional.
      // Can be a string or an array of strings for monorepos -- see below
      packagePath: 'path/to/package.json',

      // Make node builtins external. Optional. Default: true
      builtins: true,

      // Make pkg.dependencies external. Optional. Default: false
      deps: false,

      // Make pkg.peerDependencies external. Optional. Default: true
      peerDeps: true,

      // Make pkg.optionalDependencies external. Optional. Default: true
      optDeps: true,

      // Make pkg.devDependencies external. Optional. Default: true
      devDeps: true,

      // Modules to exclude from externals. Optional. Default: none
      exclude: [],

      // Modules to include in externals. Optional. Default: all
      include: [],

      // Deprecated -- see below
      except: []
    })
  ]
}
```

Most of the time, the built-in defaults are just what you need:
```js
import externals from 'rollup-plugin-node-externals'

export default {
  // ...
  plugins: [
    externals(),  // Bundle deps in; make all Node builtins, devDeps, peerDeps and optDeps external
  ]
}
```

> Note: if you're also using `@rollup/plugin-node-resolve`, make sure this plugin comes before it in the `plugins` array:
```js
import externals from 'rollup-plugin-node-externals'
import resolve from '@rollup/plugin-node-resolve'
// ...

export default {
  // ...
  plugins: [
    externals(),
    resolve(),
    // other plugins
  ]
}
```


### Options

By default, the plugin will mark all Node builtin modules and _all_ your `dev-`, `peer-` and `optionalDependencies` as external. Normal `dependencies` are left unmarked so Rollup will still bundle them with your code as expected in most situations.

- **packagePath?: string | string[] = []**

If you're working with monorepos, the `packagePath` is made for you. It can take a path, or an array of paths, to your package.json file(s). If not specified, the default is to start with the current directory's package.json then go up scan for all package.json files in parent directories recursively until either the root git directory is reached or until no other package.json can be found.

- **builtins?: boolean = true**
- **deps?: boolean = false**
- **devDeps?: boolean = true**
- **peerDeps?: boolean = true**
- **optDeps?: boolean = true**

Set the `builtins`, `deps`, `devDeps`, `peerDeps` and/or `optDeps` options to `false` to prevent the corresponding dependencies from being externalized, therefore letting Rollup bundle them with your code. Set them to `true` for Rollup to treat the corresponding dependencies as external.

- **include?: string | RegExp | (string | RegExp)[] = []**
- **exclude?: string | RegExp | (string | RegExp)[] = []**

Use the `exclude` option to remove certain dependencies from the list of externals, for example:
```js
externals({
  deps: true,           // Don't bundle dependencies, we'll require() them at runtime instead
  exclude: [
    'electron-reload',  // Yet we want `electron-reload` bundled in
    /^vuex?/            // as well as the VueJS family (vue, vuex, vue-router, etc.)
  ]
})
```

Use the `include` option to force certain dependencies into the list of externals, for example:
```js
externals({
  peerDeps: false,        // Bundle peerDependencies in
  include: /^lodash/      // Except for Lodash
})
```

> Note 1 : falsy values in `include` and `exclude` are silently ignored. This allows for conditional constructs like so: `exclude: process.env.NODE_ENV === 'production' && /mydep/`.

> Note2 : this plugin uses an exact match against your imports, so if your are using some path substitution in your code, eg.:
```js
// in your code, say '@/' is mapped to some directory:
import something from '@/mylib'
```
and you don't want `mylib` bundled in, then write:
```js
// in rollup.config.js:
externals({
    include: '@/mylib'
})
```

### Migrating from version 1.x

- In 1.x, normal dependencies were externalized by default. This is no more true, so you'll need to change:
```js
externals()
```
to:
```js
externals({ deps: true })
```
if you want the same behavior.


- For consistency with all other Rollup plugins out there, the `except` option from 1.x is now deprecated in favor of the Rollup-friendly `exclude` option. It will be removed in the next major release but is still accepted for backward compatibility and works exactly the same as `exclude` but it will issue a warning if used. To suppress this warning, just replace `except` with `exclude`.


## Licence

MIT
