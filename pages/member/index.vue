<template>
  <div>
    <v-layout wrap>
      <v-flex xs12>
        <v-text-field label="Search" v-model="searching"></v-text-field>
      </v-flex>
      <v-flex xs12 text-xs-center ma-auto>
        <v-layout wrap>
          <v-text-field label="Name" v-model="name"></v-text-field>
          <v-btn @click="addMember">ADD</v-btn>
        </v-layout>
      </v-flex>
      <v-flex xs4 pa-3 v-for="(m, idx) in members" :key="idx">
        <v-card>
          <nuxt-link :to="`/member/${m._id}`">
            <v-card-title>{{m.name}}</v-card-title>
          </nuxt-link>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      searching: ""
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
      if (this.searching.trim() === "") {
        return this.$store.getters.members;
      }
      return this.$store.getters.members.filter(m =>
        m.name.includes(this.searching)
      );
    }
  }
};
</script>

<style>
</style>
