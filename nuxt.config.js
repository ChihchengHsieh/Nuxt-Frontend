import colors from "vuetify/es5/util/colors";

export default {
  mode: "spa",
  /*
   ** Headers of the page
   */
  head: {
    titleTemplate: "%s - " + process.env.npm_package_name,
    title: process.env.npm_package_name || "",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: process.env.npm_package_description || ""
      }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons"
      },
      {
        href:
          "https://fonts.googleapis.com/css?family=Noto+Sans+TC:400,700,900&display=swap",
        rel: "stylesheet"
      },
      {
        rel: "stylesheet",
        href: "https://use.fontawesome.com/releases/v5.0.13/css/all.css"
      }
    ]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: "#fff" },
  /*
   ** Global CSS
   */
  css: [],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [
    "~/plugins/axios",
    "~/plugins/initAuth",
    {
      src: "~plugins/vue-infinite-scroll",
      ssr: false
    }
  ],
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/vuetify",
    // Doc: https://axios.nuxtjs.org/usageomjilvyngh m
    "@nuxtjs/axios",
    "@nuxtjs/proxy",
    "cookie-universal-nuxt"
  ],
  /*
   ** Axios module configuration
   ** See https://axios.nuxtjs.org/options
   */
  axios: {
    proxy: true,
    prefix: "/api",
    credentials: true
  },

  // https://shop4you-au.appspot.com/
  // http://localhost:8080
  proxy: {
    "/api": {
      target: "https://shop4you-au.appspot.com/",
      changeOrigin: true,
      pathRewrite: {
        "^/api": ""
      }
    }
  },

  /*
   ** vuetify module configuration
   ** https://github.com/nuxt-community/vuetify-module
   */

  vuetify: {
    customVariables: ["~/assets/variables.scss"],
    theme: {
      dark: false,
      themes: {
        light: {
          primary: colors.cyan.darken2,
          accent: colors.grey.darken3,
          secondary: colors.amber.darken3,
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.deepOrange.accent4,
          success: colors.green.accent3
        }
      }
    }
  },
  // vuetify: {
  //   theme: {
  //     primary: colors.cyan.darken2,
  //     accent: colors.grey.darken3,
  //     secondary: colors.amber.darken3,
  //     info: colors.teal.lighten1,
  //     warning: colors.amber.base,
  //     error: colors.deepOrange.accent4,
  //     success: colors.green.accent3
  //   }
  // },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {}
  }
};
