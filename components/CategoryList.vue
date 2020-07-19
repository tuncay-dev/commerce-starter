<template>
  <ul>
    <li v-for="category in categories" :key="category.slug">
      <n-link
        :to="{
          name: 'categories-slug',
          params: { slug: category.slug }
        }"
      >
        <category v-bind:category="category"></category>
      </n-link>
    </li>
  </ul>
</template>

<script>
import Category from "~/components/Category";

export default {
  props: ["categories"]
};
</script>
