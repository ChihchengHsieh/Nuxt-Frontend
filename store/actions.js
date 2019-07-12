import { json } from "graphlib";

export default {
  async nuxtServerInit(context, req) {
    // const ordersData = await this.$axios.$get("/order/");
    // console.log("in nuxt", ordersData);
    // context.commit("setOrders", ordersData.orders);

    const { members } = await this.$axios.$get("/member/");
    console.log("in next members:", members);
    context.commit("setMembers", members);
  },

  // async addNewOrder(context, newOrder) {
  //   var bodyFormData = new FormData();
  //   bodyFormData.set("receiver", newOrder.receiver);
  //   bodyFormData.set("products", JSON.stringify(newOrder.products));
  //   const result = await this.$axios.$post("/order/", bodyFormData);
  //   context.commit("addNewOrder", newOrder);
  // },

  async addNewMember(context, name) {
    var bodyFormData = new FormData();
    bodyFormData.set("name", name);
    const res = await this.$axios.$post("/member/", bodyFormData);
    console.log(res);
    context.commit("addNewMember", {
      name: res.insertMember.name,
      product: [],
      remark: "",
      id: res.insertID
    });
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
