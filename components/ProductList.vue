<template>
  <ul>
    <li v-for="product in products" :key="product.permalink">
      <n-link
        :to="{
          name: 'products-permalink',
          params: { permalink: product.permalink }
        }"
      >
        <product v-bind:product="product"></product>
      </n-link>
    </li>
  </ul>
</template>

<script>
import Product from "~/components/Product";

export default {
  props: ["products"]
};
</script>
