<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-card-title class="errorMessage">{{ error.message ? error.message : error}}</v-card-title>
        <v-btn @click="goBack">Back</v-btn>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: "auth",
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  // head() {
  //   const title =
  //     this.error.statusCode === 404 ? this.pageNotFound : this.otherError;
  //   return {
  //     title
  //   };
  // },
  // data() {
  //   return {
  //     pageNotFound: "404 Not Found",
  //     otherError: "An error occurred"
  //   };
  // }

  methods: {
    goBack() {
      window.location.reload(true);
    }
  }
};
</script>

<style scoped>
h1 {
  font-size: 20px;
}
</style>
