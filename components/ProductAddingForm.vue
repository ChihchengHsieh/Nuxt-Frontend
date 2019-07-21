<template>
  <v-card>
    <v-layout wrap>
      <v-flex pa-3>
        <v-text-field
          ref="order"
          label="訂單號"
          v-model="orderNum"
          v-on:keyup.enter="addProductToMember"
        ></v-text-field>
      </v-flex>
      <v-flex pa-3>
        <v-text-field label="商品名" v-model="name" v-on:keyup.enter="addProductToMember"></v-text-field>
      </v-flex>
      <v-flex pa-3>
        <v-text-field label="數量" v-model="quantity" v-on:keyup.enter="addProductToMember"></v-text-field>
      </v-flex>
      <v-flex pa-3>
        <v-text-field label="廠商" v-model="seller" v-on:keyup.enter="addProductToMember"></v-text-field>
      </v-flex>
      <v-flex pa-3 v-if="$store.getters.isAdmin">
        <v-text-field label="買$AUD" v-model="buyPriceAUD" v-on:keyup.enter="addProductToMember"></v-text-field>
      </v-flex>
      <v-flex pa-3>
        <v-text-field label="賣$TWD" v-model="sellPriceTWD" v-on:keyup.enter="addProductToMember"></v-text-field>
      </v-flex>
      <v-flex pa-3>
        <v-btn @click="addProductToMember">加入商品</v-btn>
      </v-flex>
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
        remark: ""
      };
      // console.log("id in method", this.$route.params.uid);
      await this.$store.dispatch("addProductToMember", {
        id: this.$route.params.uid,
        product: newProduct
      });
      this.cleanInputField();
      this.$nextTick(this.$refs.order.focus)
    },
    cleanInputField() {
      this.name = "";
      this.quantity = "";
      this.buyPriceAUD = "";
      this.sellPriceTWD = "";
      this.seller = "";
      this.orderNum = "";
    }
  }
};
</script>

<style>
</style>
