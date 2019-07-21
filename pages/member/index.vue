<template>
  <div>
    <v-layout wrap>
      <!-- <v-flex xs12>
        <v-text-field label="搜尋" v-model="searching"></v-text-field>
      </v-flex>-->
      <v-flex xs12 text-xs-center ma-auto>
        <v-layout wrap>
          <v-text-field label="名稱" v-model="name" v-on:keyup.enter="addMember"></v-text-field>
          <v-btn @click="addMember">加入</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs12 sm6 lg4 pa-3 v-for="(m, idx) in members" :key="idx">
        <v-card :to="`/member/${m._id}`">
          <v-card-title class="font-weight-black headline">
            <v-layout column class="align-center justify-center">
              <div class="cusFont">{{m.name}}</div>
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: ""
    };
  },

  methods: {
    async addMember() {
      await this.$store.dispatch("addNewMember", this.name);
      this.name = "";
    }
  },

  computed: {
    members() {
      if (this.name.trim() === "") {
        return this.$store.getters.members;
      }
      return this.$store.getters.members.filter(m =>
        m.name.includes(this.name)
      );
    }
  }
};
</script>

<style>
</style>
