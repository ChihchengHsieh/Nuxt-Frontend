<template>
  <v-card>
    <v-layout wrap>
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
      <v-flex x2>
        <v-text-field label="Seller" v-model="seller"></v-text-field>
      </v-flex>
      <v-flex x2>
        <v-text-field label="OrderNum" v-model="orderNum"></v-text-field>
      </v-flex>
      <v-btn @click="addProductToMember">Add</v-btn>
    </v-layout>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      quantity: "",
      buyPriceAUD: "",
      sellPriceTWD: "",
      seller: "",
      orderNum: ""
    };
  },

  props: ["member"],

  methods: {
    async addProductToMember() {
      const newProduct = {
        name: this.name,
        quantity: this.quantity,
        buyPriceAUD: this.buyPriceAUD,
        sellPriceTWD: this.sellPriceTWD,
        seller: this.seller,
        orderNum: this.orderNum,
        paid: false,
        bought: false,
        received: false,
        remark:""
      };
      console.log("id in method", this.$route.params.uid);
      await this.$store.dispatch("addProductToMember", {
        id: this.$route.params.uid,
        product: newProduct
      });
    },
    cleanInputField() {
      this.name = "";
      this.quantity = "";
      this.buyPriceAUD = "";
      this.sellPriceTWD = "";
      this.seller = "";
    }
  }
};
</script>

<style>
</style>
