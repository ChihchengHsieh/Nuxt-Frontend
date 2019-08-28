<template>
  <v-card color="primary" dark>
    <v-layout wrap>
      <v-flex xs12>
        <v-card-title>{{order.receiver}}</v-card-title>
      </v-flex>
      <v-flex xs12>
        <v-list xs12>
          <v-list-item>
            <v-layout wrap justify-start align-center>
              <v-flex xs3>
                <v-list-item-content>
                  <strong>Name</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs1>
                <v-list-item-content>
                  <strong>Qua.</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs2>
                <v-list-item-content>
                  <strong>Buy$</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs2>
                <v-list-item-content>
                  <strong>Sell$</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs2>
                <v-list-item-content>
                  <strong>Seller</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs2>
                <v-list-item-content>
                  <strong>Earn$</strong>
                </v-list-item-content>
              </v-flex>
            </v-layout>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item v-for="(p, idx) in order.products" :key="idx">
            <v-layout wrap justify-start align-center>
              <v-flex xs3>
                <v-list-item-content>
                  <strong>{{p.name}}</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs1>
                <v-list-item-content>
                  <strong>{{p.quantity}}</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs2>
                <v-list-item-content>
                  <strong>{{p.buyPriceAUD}}</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs2>
                <v-list-item-content>
                  <strong>{{p.sellPriceTWD}}</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs2>
                <v-list-item-content>
                  <strong>{{p.seller}}</strong>
                </v-list-item-content>
              </v-flex>
              <v-flex xs2>
                <v-list-item-content>
                  <strong>{{p.earningTWD}}</strong>
                </v-list-item-content>
              </v-flex>
            </v-layout>
          </v-list-item>
          <v-divider></v-divider>
          <v-list-item>All Earning: {{allEarning}}</v-list-item>
        </v-list>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ["order"],

  computed: {
    allEarning() {
      let sum = 0;
      if (this.order.products.length > 0) {
        for (let p of this.order.products) {
          sum += p.earningTWD;
        }
      }
      return sum;
    }
  }
};
</script>

<style>
</style>
