<template>
  <v-app dark class="cusFont">
    <v-navigation-drawer v-model="drawer" :clipped="true" fixed app>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon size="20">{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title class="body-1" v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="true" color="primary" app>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="white--text" />
      <nuxt-link
        to="/"
        class="black--text titleClass white--text"
        :class="{'mobileTitle ':$vuetify.breakpoint.smAndDown}"
      >Shop4you.AU</nuxt-link>
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
          icon: "fa-users",
          title: "買家",
          to: "/"
        },
        {
          icon: "fa-list",
          title: "所有商品",
          to: "/product"
        },
        {
          icon: "fa-shopping-cart",
          title: "購物清單",
          to: "/product/shopping"
        },
        {
          icon: "fa-truck",
          title: "未付未收",
          to: "/unpaid"
        }
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Vuetify.js"
    };
  },

  middleware: ["auth"],
  methods: {
    logoutUser() {
      this.$store.dispatch("logoutUser");
      this.$router.push("/auth/login");
    }
  }
};
</script>

<style >
.cusFont {
  font-family: "Noto Sans TC", sans-serif;
}

.titleClass {
  text-decoration: none;
  font-size: 1.6rem;
}
</style>
