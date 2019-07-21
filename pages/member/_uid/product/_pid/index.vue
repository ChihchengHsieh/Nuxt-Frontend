<template>
  <v-layout wrap>
    <v-flex class="text-xs-right" mb-2>
      <delete-icon-vue :deleteFunction="productDeleteFunction">{{`幫買家 ${member.name} 刪除此商品嗎?`}}</delete-icon-vue>
    </v-flex>
    <v-flex xs12>
      <product-editing-from-vue :member="member" :product="product"></product-editing-from-vue>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductEditingFromVue from "../../../../../components/ProductEditingFrom.vue";
import DeleteIconVue from "../../../../../components/DeleteIcon.vue";
export default {
  components: {
    ProductEditingFromVue,
    DeleteIconVue
  },
  computed: {
    member() {
      return this.$store.getters.getCertainMember(this.$route.params.uid);
    },

    product() {
      return this.member.products.find(p => p._id === this.$route.params.pid);
    }
  },
  methods: {
    async productDeleteFunction() {
      await this.$store.dispatch("deleteProduct", {
        uid: this.$route.params.uid,
        pid: this.$route.params.pid
      });
      this.$router.go(-1);
    }
  }
};
</script>

<style>
</style>
