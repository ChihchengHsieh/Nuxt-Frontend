export default {
  // orders: state => {
  //   return state.orders;
  // },

  members: state => {
    return state.members;
  },

  getCertainMember: state => id => {
    return state.members.find(m => m._id === id);
  },

  allProducts: state => {
    let allProducts = [];
    for (let m of state.members) {
      for (let p of m.products) {
        allProducts.push({
          ...p,
          uid: m._id,
          uname: m.name
        });
      }
    }
    return allProducts;
  }
};
