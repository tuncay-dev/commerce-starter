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

```vue
// common/commerce.js import CommerceSDK from "@chec/commerce.js"; const client
= new CommerceSDK(process.env.NUXT_ENV_CHEC_PUBLIC_API_KEY); export default
client;
```

### 3. Create homepage of categories and products

Inside of a new directory `pages`, create the file `index.js`.

We'll use this page to show information about our Commerce.js mercant account, categories, and products. We'll also link to each of our categories and products.

Inside `pages/index.js`, add the following:

```vue
// pages/index.js
<template>
  <div>
    <pre>{JSON.stringify(merchant, null, 2)}</pre>
    <pre>{JSON.stringify(categories, null, 2)}</pre>
    <pre>{JSON.stringify(products, null, 2)}</pre>
  </div>
</template>
```

All we're doing at this point is rendering our data from Commerce.js.

Let's now use the `asyncData` method to fetch our merchant info, categories, and products.

The `asyncData` will be ran on the server on the first request, and

We will return the values of our requests to Commerce.js in a new object. These values are available to the `template` due to how Vue works under the hood.

Below the `<template>` in `pages/index.js`, add the following:

```vue
// pages/index.js
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

### 4. Create `ProductList` & `Product` components

Since we'll be showing our products in more than one place throughout this example, we should probably create a component that takes care of showing our products.

Inside a new directory called `components`, create the file `Product.vue`.

This file will take care of rendering our product, and all it will do is return our `name`, and `price.formatted_with_symbol`.

```vue
// components/Product.vue
<template>
  <p>{{ product.name }}: {{ product.price.formatted_with_symbol }}</p>
</template>

<script>
export default {
  props: ["product"],
};
</script>
```

Now we will create a component to render the `Product` component for each of the products we pass it.

Inside a new file `ProductList.vue` in the `components` directory, add the following:

```vue
// components/ProductList.vue
<template>
  <ul>
    <li v-for="product in products" :key="product.permalink">
      <n-link
        :to="{
          name: 'products-permalink',
          params: { permalink: product.permalink },
        }"
      >
        <product v-bind:product="product"></product>
      </n-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["products"],
};
</script>
```

In the template above, we're simply mapping over each of our `products` passed down through `props`, and returning a new link. The contents of the link is the `Product` component we made previously.

### 5. Update index page to use `ProductList` component

Now let's update the index page to use the `ProductList` component. Inside `pages/index.js`...

```js
<pre>{JSON.stringify(products, null, 2)}</pre>
```

With our new `ProductList` component:

```vue
<product-list :products="products"></product-list>
```

_Since Nuxt automatically imports components for us, we don't need to do anything to use any component inside `~/components`._

### 6. Create products index page

Since our index is likely to contain more than just our products, let's now create a dedicated page users can visit to see all products in our Commerce.js inventory.

Inside the `pages` directory, create a new folder `products`, and a new file `index.vue`, then add the following:

```vue
<template>
  <div>
    <h1>Products</h1>

    <product-list :products="products"></product-list>
  </div>
</template>

<script>
import commerce from "~/common/commerce.js";

export default {
  async asyncData() {
    const { data: products } = await commerce.products.list();

    return {
      products,
    };
  },
};
</script>
```

Here we're making a request to Commerce.js for just our products, and rendering all our components using the custom `product-list` component we made earlier.

### 7. Create `CategoryList` & `Category` components

Similar to how we created components for our `product-list`, and `product` component earlier, we'll now do the same for categories.

Inside a new file `Category.vue` inside the `components` directory, add the following:

```vue
<template>
  <p>{{ category.name }}</p>
</template>

<script>
export default {
  props: ["category"],
};
</script>
```

All we're doing here is returning the name of our category, as we'll handle linking to it from another component.

Next create `CategoryList.vue` inside `components`, and add the following:

```vue
<template>
  <ul>
    <li v-for="category in categories" :key="category.slug">
      <n-link
        :to="{
          name: 'categories-slug',
          params: { slug: category.slug },
        }"
      >
        <category v-bind:category="category"></category>
      </n-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: ["categories"],
};
</script>
```

The only difference between this, and the `product-list` component we created earlier is that now we are rendering our `category` component, and linking to `/categories/:slug` instead of `/products/:permalink`.

### 8. Create categories index page

In the same way we created a products index page, let's now do the same for categories.

Inside the `pages` directory, create a new folder `categories`, and a new file `index.vue`, then add the following:

```vue
<template>
  <div>
    <h1>Categories</h1>

    <category-list :categories="categories"></category-list>
  </div>
</template>

<script>
import commerce from "~/common/commerce.js";

export default {
  async asyncData() {
    const { data: categories } = await commerce.categories.list();

    return {
      categories,
    };
  },
};
</script>
```

Similar to the products index, we're rendering our custom `category-list` component, and passing down `categories` from our `asyncData` request.

### 9. Update index page to use CategoryList component

Let's now update our index page to use the new `category-list` component.

Inside `pages/index.vue`, where we have:

```js
<pre>{JSON.stringify(categories, null, 2)}</pre>
```

Replace it with:

```vue
<category-list :categories="categories"></category-list>
```

Also inside this file, we'll replace the merchant information with our `business_name` as a heading.

Find:

```js
<pre>{JSON.stringify(merchant, null, 2)}</pre>
```

Replace with:

```js
<h1>{{ merchant.business_name }}</h1>
```

Let's also add links to our product, and category index pages, using the built-in `n-link` component.

Your updated `pages/index.vue` should now look something like:

```vue
<template>
  <div>
    <h1>{{ merchant.business_name }}</h1>

    <h3>
      <n-link to="/categories">Categories</n-link>
    </h3>

    <category-list :categories="categories"></category-list>

    <h3>
      <n-link to="/products">Products</n-link>
    </h3>

    <product-list :products="products"></product-list>
  </div>
</template>

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

### 10. Create individual category page
