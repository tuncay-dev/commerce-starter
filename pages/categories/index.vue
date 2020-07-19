<template>
  <div>
    <h1>Categories</h1>

    <category-list :categories="categories"></category-list>
  </div>
</template>

<script>
import commercejs from "~/common/commerce.js";
import CategoryList from "@/components/CategoryList";

export default {
  async asyncData() {
    const { data: categories } = await commercejs.categories.list();

    return {
      categories
    };
  }
};
</script>
