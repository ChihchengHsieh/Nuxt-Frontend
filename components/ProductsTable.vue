<template>
  <v-layout>
    <v-flex xs12>
      <v-list xs12>
        <v-list-tile>
          <v-layout wrap justify-start align-center>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>Order</strong>
              </v-list-tile-content>
            </v-flex>
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
            <v-flex xs1>
              <v-list-tile-content>
                <strong>Buy$</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>Sell$</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>Seller</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>Earn$</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>Bought</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>Paid</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>Received</strong>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="(p, idx) in sortedProducts" :key="idx">
          <v-layout wrap justify-start align-center>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>{{p.orderNum}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs3>
              <v-list-tile-content>
                <nuxt-link :to="`/member/${member._id}/product/${p._id}`">
                  <strong>{{p.name}}</strong>
                </nuxt-link>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>{{p.quantity}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>{{p.buyPriceAUD}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>{{p.sellPriceTWD}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>{{p.seller}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>{{(p.sellPriceTWD - p.buyPriceAUD * 22)*p.quantity}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <v-icon
                  @click="()=>toggleBox('bought', p._id, p.bought)"
                >{{p.bought? "check_box":"check_box_outline_blank"}}</v-icon>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <v-icon
                  @click="()=>toggleBox('paid', p._id, p.paid)"
                >{{p.paid? "check_box":"check_box_outline_blank"}}</v-icon>
              </v-list-tile-content>
            </v-flex>

            <v-flex xs1>
              <v-list-tile-content>
                <v-icon
                  @click="()=>toggleBox('received', p._id, p.received)"
                >{{p.received? "check_box":"check_box_outline_blank"}}</v-icon>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
        </v-list-tile>
        <v-divider></v-divider>
      </v-list>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: ["member"],

  computed: {
    sortedProducts() {
      return this.member.products.concat().sort((a, b) => {
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
    }
  },

  methods: {
    async toggleBox(type, pid, currentState) {
      switch (type) {
        case "paid":
          await this.$store.dispatch("updateProductToMember", {
            uid: this.$route.params.uid,
            pid,
            product: { paid: !currentState }
          });
          break;
        case "bought":
          await this.$store.dispatch("updateProductToMember", {
            uid: this.$route.params.uid,
            pid,
            product: { bought: !currentState }
          });
          break;
        case "received":
          await this.$store.dispatch("updateProductToMember", {
            uid: this.$route.params.uid,
            pid,
            product: { received: !currentState }
          });
          break;
        default:
          console.log("Not supported");
      }
    }
  }
};
</script>

<style>
</style>
