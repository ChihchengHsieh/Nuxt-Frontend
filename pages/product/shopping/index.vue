<template>
  <v-layout wrap>
    <v-flex xs12>
      <v-text-field label="搜尋" v-model="searching"></v-text-field>
    </v-flex>
    <v-flex xs12>
      <product-list-vue :products="buyingProduct"></product-list-vue>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductListVue from "../../../components/ProductList.vue";
export default {
  data() {
    return {
      searching: ""
    };
  },

  components: {
    ProductListVue
  },

  computed: {
    buyingProduct() {
      if (this.searching.trim() === "") {
        return this.$store.getters.allProducts.filter(p => !p.bought);
      }
      return this.$store.getters.allProducts.filter(
        p => p.name.includes(this.searching) && !p.bought
      );
    }
  }
};
</script>

<style>
</style>
