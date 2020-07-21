# nuxtjs-commercejs-example

This repo contains all of the code necessary to create a commerce store with Nuxt and Commerce.js. It includes creating index pages for products and categories, single product and category pages, and categories with associated products.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/import/project?template=https://github.com/notrab/nuxtjs-commercejs-example)

[![Codesandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/notrab/nuxtjs-commercejs-example)

## Run this locally

1. `npm install`
2. Add your `NUXT_ENV_CHEC_PUBLIC_API_KEY` to `.env`
3. `npm run dev` (Alternatively run `npm run generate` to build a static output)

## Build it with me

Before you start, you'll want to create an account at [Chec](https://commerce.com) or use the [CLI](https://github.com/chec/cli).

You'll also need to create a few categories, that have products to get the most out of this tutorial. Once you've done that, grab a copy of your public API key. You can find this at [Chec Dashboard > Developer Settings](https://dashboard.chec.io/settings/developer).

_If you don't want to create an account with Commerce.js to follow along with this tutorial, you can use the demo store public key `pk_184625ed86f36703d7d233bcf6d519a4f9398f20048ec`._

### 1. Initial setup

In this tutorial we will be using Nuxt.js. We could use the CLI to bootstrap our code, but we'll use very little of the defaults, so let's learn to build from scratch.

To begin, inside a new directory, do the following:

```bash
npm init -y
npm install nuxt @chec/commerce.js
npm install -D @nuxtjs/dotenv
```

Open `package.json` and add the following `scripts`:

```js
"scripts": {
  "dev": "nuxt",
  "build": "nuxt build",
  "start": "nuxt start",
  "export": "nuxt export",
  "serve": "nuxt serve"
},
```

Now create a new file `.env` and add your public API key here.

```
NUXT_ENV_CHEC_PUBLIC_API_KEY=...
```

### 2. Create a Commerce.js instance

We'll now instantiate a new `@chec/commerce.js` instance that we can use throughout our application.

Inside a new directory `common`, create the file `commerce.js`. Inside here we'll export a new instance of `@chec/commerce.js`, following the [Commerce.js Docs](https://commerce.com/docs/api/#authentication).

```js
// common/commerce.js
import CommerceSDK from "@chec/commerce.js";

const client = new CommerceSDK(process.env.NUXT_ENV_CHEC_PUBLIC_API_KEY);

export default client;
```

### 3. Create homepage of categories and products

Inside of a new directory `pages`, create the file `index.js`.

We'll use this page to show information about our Commerce.js mercant account, categories, and products. We'll also link to each of our categories and products.

Inside `pages/index.js`, add the following:

```vue
<template>
  <div>
    <pre>{JSON.stringify(merchant, null, 2)}</pre>
    <pre>{JSON.stringify(categories, null, 2)}</pre>
    <pre>{JSON.stringify(products, null, 2)}</pre>
  </div>
</template>
```

All we're doing at this point is rendering our data from Commerce.js - let's now use the `asyncData` method to fetch our merchant info, categories, and products.

We will then return those in a new object that's automatically available to the `template` thanks to how Vue works under the hood.

```vue
<script>
import commerce from "~/common/commerce.js";

export default {
  async asyncData() {
    const merchant = await commerce.merchants.about();
    const { data: categories } = await commerce.categories.list();
    const { data: products } = await commerce.products.list();

    return {
      merchant,
      categories,
      products,
    };
  },
};
</script>
```
