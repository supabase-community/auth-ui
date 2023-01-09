# Supabase Auth UI Solid.js 

Supabase Auth UI is a collection of pre built UI components that work seamlessly with @supabase/auth-helpers.

The main purpose of these components is to allow developers to get working on their apps quickly, but also be able to use their own style/css.

Auth UI is kept deliberately separate from @supabase/auth-helpers so that developers can migrate away from pre-built UI components as their UI system naturally matures.

## How to use?

In order to make use of the Solid.js Supabase Auth UI you'll need to have a few things ready first. Let's talk about those things step by step:

#### Install Supabase and the Solid.js Supabase-auth-ui

First let us install Supabase into our Solid.js project.

```bash
npm install @supabase/supabase-js @supabase/auth-ui-solid
# or
yarn add @supabase/supabase-js @supabase/auth-ui-solid
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
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-solid'

const supabase = createClient(
  '<INSERT PROJECT URL>',
  '<INSERT PROJECT ANON API KEY>'
)

const App = () => <Auth supabaseClient={supabase} />
```

And voila we're done! This will give you the bare minimum of what you'll need to get started with supabase-auth-ui. In order to add styling to your Auth component checkout our full documentation [here](https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#customization)

<blockquote class="twitter-tweet"><p lang="en" dir="ltr">Will be making a PR tonight to <a href="https://twitter.com/supabase?ref_src=twsrc%5Etfw">@supabase</a>&#39;s Auth UI repo. Ported and made fully reactive with <a href="https://twitter.com/solid_js?ref_src=twsrc%5Etfw">@solid_js</a> <a href="https://t.co/HDDMoZmkxq">pic.twitter.com/HDDMoZmkxq</a></p>&mdash; Michael.E (@devshogun) <a href="https://twitter.com/devshogun/status/1588575611429142528?ref_src=twsrc%5Etfw">November 4, 2022</a></blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>