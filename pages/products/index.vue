<template>
  <div>
    <h1>Products</h1>

    <product-list :products="products"></product-list>
  </div>
</template>

<script>
import commercejs from "~/common/commerce.js";
import ProductList from "@/components/ProductList";

export default {
  async asyncData() {
    const { data: products } = await commercejs.products.list();

    return {
      products
    };
  }
};
</script>
