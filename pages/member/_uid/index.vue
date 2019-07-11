<template>
  <v-layout wrap>
    <!-- Setting adding product here -->
    <v-flex class="text-xs-right" mb-2>
      <delete-icon-vue :deleteFunction="memberDeleteFunction">Delete this member?</delete-icon-vue>
      <!-- <v-btn>DELETE</v-btn> -->
    </v-flex>

    <v-flex xs12 mb-3>
      <v-card>
        <v-card-title>{{member.name}}</v-card-title>
        <v-textarea label="Remark" class="pa-3" v-model="remark"></v-textarea>
        <v-btn @click="updateRemark">Save</v-btn>
      </v-card>
    </v-flex>
    <v-flex xs12>
      <product-adding-form-vue></product-adding-form-vue>
    </v-flex>
    <v-flex xs12>
      <products-table-vue :member="member"></products-table-vue>
    </v-flex>
  </v-layout>
</template>

<script>
import ProductAddingFormVue from "../../../components/ProductAddingForm.vue";
import ProductsTableVue from "../../../components/ProductsTable.vue";
import DeleteIconVue from "../../../components/DeleteIcon.vue";
export default {
  data() {
    return {
      dialog: false,
      remark: ""
    };
  },
  components: {
    ProductAddingFormVue,
    ProductsTableVue,
    DeleteIconVue
  },

  methods: {
    async updateRemark() {
      await this.$store.dispatch("updateMember", {
        uid: this.$route.params.uid,
        member: { remark: this.remark }
      });
      this.getRemark();
    },
    getRemark() {
      this.remark = this.$store.getters.getCertainMember(
        this.$route.params.uid
      ).remark;
    },
    async memberDeleteFunction() {
      await this.$store.dispatch("deleteMember", this.$route.params.uid);
      this.$router.go(-1);
    }
  },

  mounted() {
    this.getRemark();
  },

  computed: {
    member() {
      return this.$store.getters.getCertainMember(this.$route.params.uid);
    }
  }
};
</script>

<style>
</style>
