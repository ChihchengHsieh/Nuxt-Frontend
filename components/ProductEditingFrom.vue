<template>
  <v-card>
    <v-layout wrap>
      <v-flex x2>
        <v-text-field label="OrderNum" v-model="orderNum"></v-text-field>
      </v-flex>
      <v-flex x2>
        <v-text-field label="Name" v-model="name"></v-text-field>
      </v-flex>
      <v-flex x2>
        <v-text-field label="Quantity" v-model="quantity"></v-text-field>
      </v-flex>
      <v-flex x2>
        <v-text-field label="BuyPriceAUD" v-model="buyPriceAUD"></v-text-field>
      </v-flex>
      <v-flex x2>
        <v-text-field label="SellPriceTWD" v-model="sellPriceTWD"></v-text-field>
      </v-flex>
      <v-flex xs2>
        <v-text-field label="Seller" v-model="seller"></v-text-field>
      </v-flex>
      <v-flex xs1 @click="()=>toggleBox('bought')">
        Bought
        <v-icon>{{bought? "check_box":"check_box_outline_blank"}}</v-icon>
      </v-flex>
      <v-flex xs1 @click="()=>toggleBox('paid')">
        Paid
        <v-icon>{{paid? "check_box":"check_box_outline_blank"}}</v-icon>
      </v-flex>
      <v-flex xs1 @click="()=>toggleBox('received')">
        Received
        <v-icon>{{received? "check_box":"check_box_outline_blank"}}</v-icon>
      </v-flex>
      <v-flex xs12>
        <v-textarea label="Remark" v-model="remark"></v-textarea>
      </v-flex>
      <v-btn @click="updateProduct">Edit</v-btn>
      <v-btn>Delete</v-btn>
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
