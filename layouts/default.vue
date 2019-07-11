<template>
  <v-app light>
    <v-navigation-drawer v-model="drawer" :clipped="true" fixed app>
      <v-list>
        <v-list-tile v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title v-text="item.title" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <v-toolbar clipped-left fixed app color="primary" prominent>
      <v-toolbar-side-icon @click="drawer = !drawer" />

      <v-toolbar-title v-text="`Order Management`" />
      <v-spacer />
    </v-toolbar>

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
  }
};
</script>
