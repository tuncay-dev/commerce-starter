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
import commercejs from "~/common/commerce.js";
import CategoryList from "@/components/CategoryList";
import ProductList from "@/components/ProductList";

export default {
  async asyncData() {
    const merchant = await commercejs.merchants.about();
    const { data: categories } = await commercejs.categories.list();
    const { data: products } = await commercejs.products.list();

    return {
      merchant,
      categories,
      products
    };
  }
};
</script>
