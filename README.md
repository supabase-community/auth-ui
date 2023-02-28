# Supabase Auth UI

Supabase Auth UI is a collection of pre built UI components that work seamlessly with @supabase/auth-helpers.

The main purpose of these components is to allow developers to get working on their apps quickly, but also be able to use their own style/css.

Auth UI is kept deliberately separate from @supabase/auth-helpers so that developers can migrate away from pre-built UI components as their UI system naturally matures.

<img width="552" alt="Screenshot 2022-04-30 at 9 30 25 PM" src="https://user-images.githubusercontent.com/8291514/166107630-edb5190c-1d27-4757-8960-11ef14f87af1.png">

[React.js]: https://reactjs.org/
[Solid.js]: https://www.solidjs.com/
[Svelte]: https://svelte.dev/

## Supported frameworks

- [React.js]() [[Documentation](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui)]
- [Solid.js]()
- [Svelte]()

### Examples and Packages

- Examples
  - `@example/react`: a [React.js]() app
  - `@example/solid`: a [Solid.js]() app
  - `@example/svelte`: a [Svelte]() app
- Packages
  - `@supabase/auth-ui-react`: the supabase auth ui reactjs library used by `react` application
  - `@supabase/auth-ui-solid`: the supabase auth ui solid.js library used by `solid.js` application
  - `@supabase/auth-ui-svelte`: the supabase auth ui svelte library used by `svelte` application
  - `shared`: shared typescript types used by `@supabase/auth-ui-[framework]` library
  - `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

## Localization

Localizations are no longer distributed with the package in order to keep the package size small. You can now import the localization you need by copying the file from this repo and importing it into your project then passing it to the `localization.variables` param of the Auth component.

```tsx
import { Auth } from '@supabase/auth-ui-react'
import * as ja from './path-to-localization-file.json'
...
<Auth
  supabaseClient={supabase}
  localization={{
    variables: ja
  }}
/>
...
```

## Development

Read the [development.md](./development.md) for more information.

Using a `@supabase/auth-ui-[framework-name]` naming convention for packages
