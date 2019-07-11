<template>
  <div>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">Delete</v-btn>
      </template>
      <v-card>
        <v-card-title class="cus-font title">
          <slot />
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">No</v-btn>
          <v-btn @click="deleteFunction">Yes</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false
    };
  },
  props: ["deleteFunction"]
};
</script>

<style>
</style>
