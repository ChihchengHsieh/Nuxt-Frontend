<template>
  <v-layout wrap>
    <v-flex xs12 mb-5>
      <order-adding-form-vue />
    </v-flex>
    <v-flex xs12></v-flex>
    <v-flex xs12 v-for="(order, idx) in orders" :key="idx" mb-3>
      <order-card-vue :order="order" />
    </v-flex>
  </v-layout>
</template>

<script>
import OrderCardVue from "../components/OrderCard.vue";
import OrderAddingFormVue from "../components/OrderAddingForm.vue";

export default {
  async asyncData({
    isDev,
    route,
    store,
    env,
    params,
    query,
    req,
    res,
    redirect,
    error,
    app
  }) {
    // const ordersData = await app.$axios.$get("/order/");
    // console.log(ordersData);
    // return { ordersData: ordersData.orders };
  },

  data() {
    return {
      orderData2: null 
    };
  },

  computed: {
    orders() {
      return this.$store.getters.orders;
    }
  },

  components: {
    OrderCardVue,
    OrderAddingFormVue
  }

  // async mounted() {
  //   const OrdersData = await this.$axios.$get("/order/");
  //   console.log(OrdersData);
  //   this.orderData2 = OrdersData
  // },
};
</script>

<style>
</style>
