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
import commerce from "~/common/commerce";

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
