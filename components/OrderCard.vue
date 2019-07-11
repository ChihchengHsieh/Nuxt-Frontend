<template>
  <v-card color="primary" dark>
    <v-layout wrap>
      <v-flex xs12>
        <v-card-title>{{order.receiver}}</v-card-title>
      </v-flex>
      <v-flex xs12>
        <v-list xs12>
          <v-list-tile>
            <v-layout wrap justify-start align-center>
              <v-flex xs3>
                <v-list-tile-content>
                  <strong>Name</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs1>
                <v-list-tile-content>
                  <strong>Qua.</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
                <v-list-tile-content>
                  <strong>Buy$</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
                <v-list-tile-content>
                  <strong>Sell$</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
                <v-list-tile-content>
                  <strong>Seller</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
                <v-list-tile-content>
                  <strong>Earn$</strong>
                </v-list-tile-content>
              </v-flex>
            </v-layout>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile v-for="(p, idx) in order.products" :key="idx">
            <v-layout wrap justify-start align-center>
              <v-flex xs3>
                <v-list-tile-content>
                  <strong>{{p.name}}</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs1>
                <v-list-tile-content>
                  <strong>{{p.quantity}}</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
                <v-list-tile-content>
                  <strong>{{p.buyPriceAUD}}</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
                <v-list-tile-content>
                  <strong>{{p.sellPriceTWD}}</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
                <v-list-tile-content>
                  <strong>{{p.seller}}</strong>
                </v-list-tile-content>
              </v-flex>
              <v-flex xs2>
                <v-list-tile-content>
                  <strong>{{p.earningTWD}}</strong>
                </v-list-tile-content>
              </v-flex>
            </v-layout>
          </v-list-tile>
          <v-divider></v-divider>
          <v-list-tile>All Earning: {{allEarning}}</v-list-tile>
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
