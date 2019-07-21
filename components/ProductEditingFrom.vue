<template>
  <v-card>
    <v-layout wrap>
      <v-flex xs12 pa-3 sm2>
        <v-text-field label="訂單號" v-model="orderNum"></v-text-field>
      </v-flex>
      <v-flex xs12 pa-3 sm10>
        <v-text-field label="商品名" v-model="name"></v-text-field>
      </v-flex>
      <v-flex xs12 pa-3 sm2>
        <v-text-field label="數量" v-model="quantity"></v-text-field>
      </v-flex>
      <v-flex xs12 pa-3 sm10>
        <v-text-field label="廠商" v-model="seller"></v-text-field>
      </v-flex>
      <v-flex xs12 pa-3 sm6 v-if="$store.getters.isAdmin"> 
        <v-text-field label="買$AUD" v-model="buyPriceAUD"></v-text-field>
      </v-flex>
      <v-flex xs12 pa-3 :class="{'sm6 xs12': $store.getters.isAdmin}">
        <v-text-field label="賣$TWD" v-model="sellPriceTWD"></v-text-field>
      </v-flex>

      <v-flex pa-3 xs4 @click="()=>toggleBox('bought')">
        買
        <v-icon>{{bought? "check_box":"check_box_outline_blank"}}</v-icon>
      </v-flex>
      <v-flex pa-3 xs4 @click="()=>toggleBox('paid')">
        付
        <v-icon>{{paid? "check_box":"check_box_outline_blank"}}</v-icon>
      </v-flex>
      <v-flex pa-3 xs4 @click="()=>toggleBox('received')">
        收
        <v-icon>{{received? "check_box":"check_box_outline_blank"}}</v-icon>
      </v-flex>
      <v-flex xs12 pa-3>
        <v-textarea label="備註" v-model="remark"></v-textarea>
      </v-flex>
      <v-btn @click="updateProduct">編輯</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  props: ["member", "product"],

  mounted() {
    this.name = this.product.name;
    this.quantity = this.product.quantity;
    this.buyPriceAUD = this.product.buyPriceAUD;
    this.sellPriceTWD = this.product.sellPriceTWD;
    this.seller = this.product.seller;
    this.orderNum = this.product.orderNum;
    this.remark = this.product.remark;
    this.paid = this.product.paid;
    this.received = this.product.received;
    this.bought = this.product.bought;
  },

  data() {
    return {
      name: "",
      quantity: "",
      buyPriceAUD: "",
      sellPriceTWD: "",
      seller: "",
      orderNum: "",
      remark: "",
      paid: false,
      received: false,
      bought: false
    };
  },

  methods: {
    async updateProduct() {
      const updatedProduct = {
        name: this.name,
        quantity: this.quantity,
        buyPriceAUD: this.buyPriceAUD,
        sellPriceTWD: this.sellPriceTWD,
        seller: this.seller,
        orderNum: this.orderNum,
        remark: this.remark,
        paid: this.paid,
        received: this.received,
        bought: this.bought
      };

      await this.$store.dispatch("updateProductToMember", {
        uid: this.$route.params.uid,
        pid: this.$route.params.pid,
        product: updatedProduct
      });
      this.$router.push(`/member/${this.$route.params.uid}`);
    },
    async toggleBox(type) {
      switch (type) {
        case "paid":
          this.paid = !this.paid;
          break;
        case "bought":
          this.bought = !this.bought;
          break;
        case "received":
          this.received = !this.received;
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
