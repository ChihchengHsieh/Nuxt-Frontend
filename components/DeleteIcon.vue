<template>
  <div>
    <v-dialog v-model="dialog">
      <template v-slot:activator="{ on }">
        <v-btn v-on="on">刪除</v-btn>
      </template>
      <v-card>
        <v-card-title class="cus-font title">
          <slot />
        </v-card-title>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="dialog = false">否</v-btn>
          <v-btn @click="deleteFunction">是</v-btn>
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
