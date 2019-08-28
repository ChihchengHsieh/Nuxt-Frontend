<template>
  <v-layout>
    <v-card class="pa-3 ma-1">
      <strong ma-3 pa-3>利潤: $ {{allEarning}}</strong>
      <strong v-if="$vuetify.breakpoint.smAndUp">TWD</strong>
    </v-card>
    <v-spacer />

    <v-card class="pa-3 ma-1">
      <strong ma-3 pa-3>數量: {{allQua}}</strong>
    </v-card>


    <v-spacer />
    <v-card class="pa-3 ma-1">
      <strong>未付: $ {{unpaid}}</strong>
      <strong v-if="$vuetify.breakpoint.smAndUp">TWD</strong>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  props: ["products"],

  computed: {
    allEarning() {
      let sum = 0;
      for (const p of this.products) {
        sum += (p.sellPriceTWD - p.buyPriceAUD * 22) * p.quantity;
      }
      return sum.toFixed(2);
    },
    unpaid() {
      let unpaid = 0;
      for (const p of this.products) {
        if (!p.paid) {
          unpaid += Number(p.sellPriceTWD) * Number(p.quantity);
        }
      }
      return unpaid;
    },
    allQua(){
      let qua = 0
      for (const p of this.products){
        qua += Number(p.quantity)
      }
      return qua
    }
  }
};
</script>

<style>
</style>
