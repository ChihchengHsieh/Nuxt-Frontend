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

    <v-flex pa-3>
      <v-btn @click.stop="cleanInput" large color="primary">清除</v-btn>
    </v-flex>

    <v-flex xs12 pa-2>
      <products-amount-vue :products="sortedProducts" />
    </v-flex>
    <v-flex xs12>
      <div
        v-infinite-scroll="loadMoreProdcuts"
        infinite-scroll-disabled="busy"
        infinite-scroll-distance="10"
        infinite-scroll-throttle-delay="1000"
      >
        <product-list-vue @copyToSearch="addSearch" :products="showingProducts"></product-list-vue>
      </div>
    </v-flex>
    <v-flex xs5></v-flex>
    <v-flex xs2 class="mt-2">
      <v-btn disabled color="primary">{{ busy ? "End": "Loading..."}}</v-btn>
    </v-flex>
    <v-flex xs5></v-flex>
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
      busy: false,
      pageN: 1,
      pageSize: 20,
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
  methods: {
    cleanInput() {
      this.searchingP = "";
      this.searchingU = "";
      this.orderNum = "";
      this.buySelection = null;
      this.paidSelection = null;
      this.receivedSelection = null;
    },
    loadMoreProdcuts() {
      // console.log("Loading Called");

      this.pageN++;
    },
    addSearch(name) {
      // console.log("AddSearch called");
      this.searchingP = name;
    }
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
    },

    showingProducts() {
      if (this.sortedProducts.length > this.pageN * this.pageSize) {
        this.busy = false;
        // console.log("busyChanged");
        return this.sortedProducts.slice(0, this.pageN * this.pageSize);
      }
      this.busy = true;
      // console.log("busyChanged");
      return this.sortedProducts;
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
