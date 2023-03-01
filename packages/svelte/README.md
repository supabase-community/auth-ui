# Supabase Auth UI Svelte 

Supabase Auth UI is a collection of pre built UI components that work seamlessly with @supabase/auth-helpers.

The main purpose of these components is to allow developers to get working on their apps quickly, but also be able to use their own style/css.

Auth UI is kept deliberately separate from @supabase/auth-helpers so that developers can migrate away from pre-built UI components as their UI system naturally matures.

## How to use?

In order to make use of the Auth UI Svelte you'll need to have a few things ready first. Let's talk about those things step by step:

#### Install Supabase and the Svelte Supabase-auth-ui

First let us install Supabase into our Svelte project.

```bash
npm install @supabase/supabase-js @supabase/auth-ui-svelte
# or
pnpm add @supabase/supabase-js @supabase/auth-ui-svelte
# or
yarn add @supabase/supabase-js @supabase/auth-ui-svelte
```

#### Create you Supabase client

Let's create our Supabase client 

```js
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  '<INSERT PROJECT URL>',
  '<INSERT PROJECT ANON API KEY>'
)
```

#### Passing your Supabase client to the Auth component as a prop

```js
<script lang="ts">
    import { createClient } from '@supabase/supabase-js'
    import { Auth } from '@supabase/auth-ui-svelte'

    const supabase = createClient(
        '<INSERT PROJECT URL>',
        '<INSERT PROJECT ANON API KEY>'
    )
</script>

<Auth supabaseClient={supabase} />
```

And voila we're done! This will give you the bare minimum of what you'll need to get started with supabase-auth-ui. In order to add styling to your Auth component checkout our full documentation [here](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#customization)