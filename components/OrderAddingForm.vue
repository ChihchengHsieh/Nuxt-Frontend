<template>
  <v-card>
    <v-layout wrap>
      <v-flex xs12 pa-3>
        <v-text-field label="Receiver" v-model="receiver" />
      </v-flex>

      <v-flex xs4 pa-3>
        <!-- Products Here -->
        <v-text-field label="Product Name" v-model="name"></v-text-field>
      </v-flex>

      <v-flex xs2 pa-3>
        <!-- Products Here -->
        <v-text-field label="Quantity" v-model="quantity"></v-text-field>
      </v-flex>

      <v-flex xs4 pa-3>
        <!-- Products Here -->
        <v-text-field label="Seller" v-model="seller"></v-text-field>
      </v-flex>

      <v-flex xs2></v-flex>

      <v-flex xs3 pa-3>
        <!-- Products Here -->
        <v-text-field label="Buy Price AUD" v-model="buyPriceAUD"></v-text-field>
      </v-flex>

      <v-flex xs3 pa-3>
        <!-- Products Here -->
        <v-text-field label="Sell Price TWD" v-model="sellPriceTWD"></v-text-field>
      </v-flex>

      <v-flex xs3 pa-3>
        <v-btn @click="addingProduct">Add</v-btn>
      </v-flex>
    </v-layout>

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
      <v-list-tile v-for="(p, idx) in products" :key="idx">
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
    </v-list>

    <v-flex xs12>
      <v-card-title>This Order earninig: {{allEarning}}</v-card-title>
    </v-flex>

    <!-- <v-list>
      <v-list-tile v-for="(p, idx) in products" :key="idx">
        <v-layout>
          <v-flex xs3>{{p.name}}</v-flex>
          <v-flex xs3>{{p.buyPriceAUD}}</v-flex>
          <v-flex xs3>{{p.sellPriceTWD}}</v-flex>
          <v-flex xs3>{{p.quantity}}</v-flex>
        </v-layout>
      </v-list-tile>
    </v-list>-->

    <v-btn @click="addingOrder">Send Order</v-btn>
    <!-- Prodcuts Display -->
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      receiver: "",
      quantity: "",
      seller: "",
      buyPriceAUD: "",
      sellPriceTWD: "",
      products: [],
      AUDtoTWD: 22
    };
  },

  methods: {
    addingProduct() {
      // Calculate earning here

      const orderData = {
        name: this.name,
        quantity: this.quantity,
        seller: this.seller,
        buyPriceAUD: this.buyPriceAUD,
        sellPriceTWD: this.sellPriceTWD,
        earningTWD:
          (this.sellPriceTWD - this.buyPriceAUD * this.AUDtoTWD) * this.quantity
      };

      this.products.push(orderData);
      this.cleanInputData();
    },

    addingOrder() {
      this.$store.dispatch("addNewOrder", {
        receiver: this.receiver,
        products: this.products
      });
      this.cleanInputData();
      this.receiver = "";
      this.products = [];
    },

    cleanInputData() {
      this.name = "";
      this.quantity = "";
      this.seller = "";
      this.buyPriceAUD = "";
      this.sellPriceTWD = "";
    }
  },

  computed: {
    allEarning() {
      let sum = 0;
      if (this.products.length > 0) {
        for (let p of this.products) {
          sum += p.earningTWD;
        }
      }
      return sum;
    }
  }
};
/*
type Order struct {
	ID          primitive.ObjectID `json:"_id" bson:"_id,omitempty"`
	Receiver    string             `json:"receiver" bson:"receiver"`
	CreatedAt   time.Time          `json:"createdAt" bson:"createdAt"`
	UpdatedAt   time.Time          `json:"updatedAt" bson:"updatedAt"`
	Products    []interface{}      `json:"products" bson:"products"`
	Paid        bool               `json:"paid" bson:"paid"`
	SendingDate time.Time          `json:"sendingDate" bson:"sendingDate"`
}
*/

// THe map[string]string should have these fields
// type Product struct {
// 	Name           string
// 	Quantity       int
// 	BoughtPriceAUD float32
// 	BoughtPriceTWD float32
// 	SellPriceAUD   float32
// 	SellPriceTWD   float32
// 	Seller         string
// 	EarningAUD     float32
// 	EarningTWD     float32
// }
</script>

<style>
</style>


