<template>
  <v-app light>
    <v-app-bar :clipped-left="true" color="primary" app>
      <v-toolbar-title
        :class="{'mobileTitle ':$vuetify.breakpoint.smAndDown}"
        v-text="`Shop4you.AU`"
      />
      <v-spacer />
      <v-btn color="primary" to="/auth/login" v-if="!$store.getters.isLogin">登入</v-btn>
      <v-btn color="primary" to="/auth/signup" v-if="!$store.getters.isLogin">註冊</v-btn>
      <v-btn color="primary" @click.stop="logoutUser" v-if="$store.getters.isLogin">登出</v-btn>
    </v-app-bar>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "apps",
          title: "All Orders",
          to: "/"
        },

        {
          icon: "account_box",
          title: "Members",
          to: "/member"
        },
        {
          icon: "view_list",
          title: "Products",
          to: "/product"
        },
        {
          icon: "store",
          title: "Shopping List",
          to: "/product/shopping"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },

  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/auth/login");
    }
  }
};
</script>
<style >
.mobileTitle {
  /* font-size: 1rem !important; */
}
</style>
