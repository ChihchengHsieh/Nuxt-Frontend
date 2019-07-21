<template>
  <v-layout class="elevation-3">
    <v-flex xs12>
      <v-list xs12 two-line>
        <v-list-tile>
          <v-layout
            wrap
            justify-start
            align-center
            :class="{'mobileColumn':$vuetify.breakpoint.smAndDown}"
          >
            <v-flex xs1>
              <v-list-tile-content>
                <strong>單</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs2 sm1 :class="{'sm2': !$store.getters.isAdmin}">
              <v-list-tile-content>
                <strong>買家</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs3 sm2 :class="{'sm3': !$store.getters.isAdmin}">
              <v-list-tile-content>
                <strong>商品</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>量</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1 v-if="$vuetify.breakpoint.smAndUp && $store.getters.isAdmin">
              <v-list-tile-content>
                <strong>買(AU)</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs2 sm1>
              <v-list-tile-content>
                <strong>賣(TW)</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1 v-if="$vuetify.breakpoint.smAndUp">
              <v-list-tile-content>
                <strong>廠商</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1 v-if="$vuetify.breakpoint.smAndUp && $store.getters.isAdmin">
              <v-list-tile-content>
                <strong>利(TW)</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>買</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>付</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>收</strong>
              </v-list-tile-content>
            </v-flex>
          </v-layout>
        </v-list-tile>
        <v-divider></v-divider>
        <v-list-tile v-for="(p, idx) in products" :key="idx">
          <v-layout wrap justify-start align-center>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>{{p.orderNum}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs2 sm1 :class="{'sm2': !$store.getters.isAdmin}">
              <v-list-tile-content :class="{'mobileListFont':$vuetify.breakpoint.smAndDown}">
                <nuxt-link :to="`/member/${p.uid}`">
                  <strong>{{p.uname}}</strong>
                </nuxt-link>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs3 sm2 :class="{'sm3': !$store.getters.isAdmin}">
              <v-list-tile-content :class="{'mobileListFont':$vuetify.breakpoint.smAndDown}">
                <nuxt-link :to="`/member/${p.uid}/product/${p._id}`">
                  <strong>{{p.name}}</strong>
                </nuxt-link>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <strong>{{p.quantity}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1 v-if="$vuetify.breakpoint.smAndUp && $store.getters.isAdmin">
              <v-list-tile-content>
                <strong>{{p.buyPriceAUD}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs2 sm1>
              <v-list-tile-content>
                <strong>{{p.sellPriceTWD}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1 v-if="$vuetify.breakpoint.smAndUp">
              <v-list-tile-content>
                <strong>{{p.seller}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1 v-if="$vuetify.breakpoint.smAndUp && $store.getters.isAdmin">
              <v-list-tile-content>
                <strong>{{((p.sellPriceTWD - p.buyPriceAUD * 22)*p.quantity).toFixed(2)}}</strong>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <v-icon
                  @click="()=>toggleBox('bought', p.uid, p._id, p.bought)"
                >{{p.bought? "check_box":"check_box_outline_blank"}}</v-icon>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <v-icon
                  @click="()=>toggleBox('paid', p.uid ,p._id, p.paid)"
                >{{p.paid? "check_box":"check_box_outline_blank"}}</v-icon>
              </v-list-tile-content>
            </v-flex>
            <v-flex xs1>
              <v-list-tile-content>
                <v-icon
                  @click="()=>toggleBox('received', p.uid, p._id, p.received)"
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
  props: ["products"],

  methods: {
    async toggleBox(type, uid, pid, currentState) {
      switch (type) {
        case "paid":
          await this.$store.dispatch("updateProductToMember", {
            uid,
            pid,
            product: { paid: !currentState }
          });
          break;
        case "bought":
          await this.$store.dispatch("updateProductToMember", {
            uid,
            pid,
            product: { bought: !currentState }
          });
          break;
        case "received":
          await this.$store.dispatch("updateProductToMember", {
            uid,
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
.mobileColumn {
  font-size: 1rem !important;
}

.mobileListFont {
  font-size: 1rem !important;
}
</style>
