<template>
  <div>
    <h1>{{ category.name }}</h1>

    <product-list :products="products"></product-list>
  </div>
</template>

<script>
import commercejs from "~/common/commerce.js";
import ProductList from "@/components/ProductList";

export default {
  async asyncData({ params }) {
    const { slug } = params;

    const category = await commercejs.categories.retrieve(slug, {
      type: "slug"
    });
    const { data: products } = await commercejs.products.list({
      category_slug: slug
    });

    return {
      category,
      products
    };
  }
};
</script>
