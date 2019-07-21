<template>
  <v-layout wrap>
    <v-flex xs2 lg2 pa-3>
      <v-text-field label="單" v-model="orderNum"></v-text-field>
    </v-flex>
    <v-flex xs5 lg3 pa-3>
      <v-text-field label="買家" v-model="searchingU"></v-text-field>
    </v-flex>
    <v-flex xs5 lg4 pa-3>
      <v-text-field label="商品" v-model="searchingP"></v-text-field>
    </v-flex>

    <v-flex xs4 lg1 pa-3>
      <v-select
        label="買"
        class="selectionFont"
        :items="buyItems"
        item-text="text"
        item-value="value"
        v-model="buySelection"
      ></v-select>
    </v-flex>

    <v-flex xs4 lg1 pa-3>
      <v-select
        label="付"
        class="selectionFont"
        :items="paidItems"
        item-text="text"
        item-value="value"
        v-model="paidSelection"
      ></v-select>
    </v-flex>
    <v-flex xs4 lg1 pa-3>
      <v-select
        label="收"
        class="selectionFont"
        :items="receivedItems"
        item-text="text"
        item-value="value"
        v-model="receivedSelection"
      ></v-select>
    </v-flex>

    <v-flex xs12 pa-2>
      <products-amount-vue :products="sortedProducts" />
    </v-flex>
    <v-flex xs12>
      <product-list-vue :products="sortedProducts"></product-list-vue>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductListVue from "../../components/ProductList.vue";
import ProductsAmountVue from "../../components/ProductsAmount.vue";
export default {
  data() {
    return {
      searchingP: "",
      searchingU: "",
      orderNum: "",
      buyItems: [
        { text: "", value: null },
        { text: "已買", value: true },
        { text: "未買", value: false }
      ],
      buySelection: null,

      paidItems: [
        { text: "", value: null },
        { text: "已付", value: true },
        { text: "未付", value: false }
      ],
      paidSelection: null,
      receivedItems: [
        { text: "", value: null },
        { text: "已收", value: true },
        { text: "未收", value: false }
      ],
      receivedSelection: null
    };
  },
  computed: {
    products() {
      let resultProduct = this.$store.getters.allProducts;

      if (
        this.searchingP.trim() === "" &&
        this.orderNum.trim() === "" &&
        this.searchingU.trim() === "" &&
        this.buySelection === null &&
        this.paidSelection === null &&
        this.receivedSelection === null
      ) {
        return resultProduct;
      }

      if (this.searchingU.trim() !== "") {
        resultProduct = resultProduct.filter(p =>
          p.uname.includes(this.searchingU)
        );
      }

      if (this.searchingP.trim() !== "") {
        resultProduct = resultProduct.filter(p =>
          p.name.includes(this.searchingP)
        );
      }

      if (this.orderNum.trim() !== "") {
        resultProduct = resultProduct.filter(p => p.orderNum == this.orderNum);
      }

      if (this.buySelection !== null) {
        resultProduct = resultProduct.filter(
          p => p.bought == this.buySelection
        );
      }

      if (this.paidSelection !== null) {
        resultProduct = resultProduct.filter(p => p.paid == this.paidSelection);
      }

      if (this.receivedSelection !== null) {
        resultProduct = resultProduct.filter(
          p => p.received == this.receivedSelection
        );
      }

      return resultProduct;

      // return this.$store.getters.allProducts.filter(p =>
      //   p.name.includes(this.searching)
      // );
    },

    sortedProducts() {
      return this.products.concat().sort((a, b) => {
        return Number(b.orderNum) - Number(a.orderNum);
      });
    }
  },

  components: {
    ProductListVue,
    ProductsAmountVue
  }
};
</script>

<style>
.selectionFont {
  font-size: 0.8rem;
}
</style>
