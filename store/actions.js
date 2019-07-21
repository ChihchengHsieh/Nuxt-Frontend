export default {
  async nuxtServerInit(context) {
    // const ordersData = await this.$axios.$get("/order/");
    // console.log("in nuxt", ordersData);
    // context.commit("setOrders", ordersData.orders);

    await context.dispatch("initAuth");
    await context.dispatch("fetchingMemberData");
    // console.log("In init: ", app.$axios);
  },

  // async addNewOrder(context, newOrder) {
  //   var bodyFormData = new FormData();
  //   bodyFormData.set("receiver", newOrder.receiver);
  //   bodyFormData.set("products", JSON.stringify(newOrder.products));
  //   const result = await this.$axios.$post("/order/", bodyFormData);
  //   context.commit("addNewOrder", newOrder);
  // },

  async fetchingMemberData(context) {
    if (context.getters.isLogin) {
      // console.log("Fetching in client :", process.client);
      // console.log("detected as login");
      // console.log(context.getters.token);
      // console.log(context.getters.user);
      const res = await this.$axios.$get("/member/");

      if (res.members) {
        context.commit("setMembers", res.members);
      }
    }
  },

  initAuth(context) {
    if (!context.getters.isLogin) {
      let user = null;
      let token = null;

      if (process.client) {
        user = JSON.parse(localStorage.getItem("user"));
        token = JSON.parse(localStorage.getItem("token"));

        // console.log("Found in the client");
        // console.log("user:", user);
        // console.log("token", token);
      } else {
        user = this.$cookies.get("user");
        token = this.$cookies.get("token");
        // console.log("Found in the cookies");
        // console.log("user:", user);
        // console.log("token", token);
      }

      if (user) {
        context.dispatch("setUser", user);
      }

      if (token) {
        context.dispatch("setToken", token);
      }
    }
  },

  setUser(context, user) {
    if (process.client) {
      localStorage.setItem("user", user);
    }
    this.$cookies.set("user", user);
    context.commit("setUser", user);
  },

  setToken(context, token) {
    console.log("In client:", process.client);
    this.$axios.setToken(token);
    // console.log("After setting token: ");

    if (process.client) {
      localStorage.setItem("token", token);
    }
    this.$cookies.set("token", token);
    context.commit("setToken", token);
  },

  async addNewMember(context, name) {
    var bodyFormData = new FormData();
    bodyFormData.set("name", name);
    const res = await this.$axios.$post("/member/", bodyFormData);
    console.log(res);
    context.commit("addNewMember", {
      name: res.insertMember.name,
      products: [],
      remark: "",
      _id: res.insertID
    });
  },

  // Need Singup user and login user actions

  async signupUser(context, user) {
    const { email, password, code } = user;
    var bodyFormData = new FormData();

    bodyFormData.set("email", email);
    bodyFormData.set("password", password);
    bodyFormData.set("code", code);

    const res = await this.$axios.post("/user/signup", bodyFormData);

    console.log(res);

    context.dispatch("setToken", res.data.token);
    context.dispatch("setUser", res.data.user);

    await context.dispatch("fetchingMemberData");
  },

  async loginUser(context, user) {
    const { email, password } = user;
    var bodyFormData = new FormData();

    bodyFormData.set("email", email);
    bodyFormData.set("password", password);

    let res;

    // try {
    res = await this.$axios.post("/user/login", bodyFormData);
    // } catch (e) {
    //   console.log(JSON.stringify(e.response));
    //   throw new Error(e.response.data.msg)
    // }

    context.dispatch("setToken", res.data.token);
    context.dispatch("setUser", res.data.user);
    await context.dispatch("fetchingMemberData");
  },

  logoutUser(context) {
    context.dispatch("setToken", null);
    context.dispatch("setUser", null);
    context.commit("setMembers", []);

    if (process.client) {
      // Remove the storing data in localStorage
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

    this.$cookies.remove("user");
    this.$cookies.remove("token");
  },

  async addProductToMember(context, payload) {
    const { id, product } = payload;
    var bodyFormData = new FormData();

    console.log("id in action", id);
    bodyFormData.set("product", JSON.stringify(product));
    const res = await this.$axios.post(`/member/${id}/product/`, bodyFormData);
    console.log("the rest in action", res);
    context.commit("addNewProductToMember", {
      id,
      product: res.data.addedProduct
    });
  },

  async updateProductToMember(context, payload) {
    // three things needed 1. uid 2. pid 3. updatedField
    const { uid, pid, product } = payload;
    var bodyFormData = new FormData();
    bodyFormData.set("product", JSON.stringify(product));
    const res = await this.$axios.put(
      `/member/${uid}/product/${pid}`,
      bodyFormData
    );
    context.commit("updateProductToArray", {
      uid,
      pid,
      product: res.data.updatedProduct
    });
  },

  async updateMember(context, payload) {
    const { uid, member } = payload;
    var bodyFormData = new FormData();
    console.log("Member 1:", member);
    bodyFormData.set("member", JSON.stringify(member));
    console.log("Member 2:", member);
    const res = await this.$axios.put(`/member/${uid}`, bodyFormData);
    console.log("Member 3:", member);
    console.log("res: ", res);
    context.commit("updateMember", {
      uid,
      member: res.data.updatingFields
    });
  },

  async deleteMember(context, uid) {
    const res = await this.$axios.delete(`/member/${uid}`);
    console.log("res", res);
    context.commit("deleteMember", uid);
  },

  async deleteProduct(context, payload) {
    const { uid, pid } = payload;
    const res = await this.$axios.delete(`/member/${uid}/product/${pid}`);
    context.commit("deleteProduct", payload);
  }
};
