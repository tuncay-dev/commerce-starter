<template>
  <div>
    <h1>Categories</h1>

    <ul></ul>
    <li v-for="category in categories" :key="category.slug">
      <n-link
        :to="{
          name: 'categories-slug',
          params: { slug: category.slug }
        }"
      >
        {{ category.name }}
      </n-link>
    </li>
  </div>
</template>

<script>
import commercejs from "~/common/commerce.js";

export default {
  async asyncData() {
    const { data: categories } = await commercejs.categories.list();

    return {
      categories
    };
  }
};
</script>
