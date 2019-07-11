<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-text-field label="Search" v-model="searching"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <product-list-vue :products="products"></product-list-vue>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductListVue from "../../components/ProductList.vue";
export default {
  data() {
    return {
      searching: ""
    };
  },
  computed: {
    products() {
      if (this.searching.trim() === "") {
        return this.$store.getters.allProducts;
      }
      return this.$store.getters.allProducts.filter(p =>
        p.name.includes(this.searching)
      );
    }
  },
  components: {
    ProductListVue
  }
};
</script>

<style>
</style>
