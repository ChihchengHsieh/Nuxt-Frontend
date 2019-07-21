export default {
  // addNewOrder(state, newOrder) {
  //   state.orders.push(newOrder);
  // },
  // setOrders(state, orders) {
  //   console.log("Call set Order here:", orders);
  //   state.orders = orders;
  //   console.log("After set order:", state.orders);
  // },
  addNewMember(state, newMember) {
    // console.log("current state:", state);
    // console.log("current members is ", state.members);
    state.members.push(newMember);
    // console.log("after members is ", state.members);
  },

  setMembers(state, members) {
    state.members = members;
  },

  setToken(state, token) {
    state.token = token;
  },

  setUser(state, user) {
    state.user = user;
  },

  addNewProductToMember(state, payload) {
    const { id, product } = payload;
    for (let m of state.members) {
      if (m._id === id) {
        m.products.push(product);
      }
    }
  },

  updateProductToArray(state, payload) {
    const { uid, pid, product } = payload;
    for (let m of state.members) {
      if (m._id === uid) {
        for (let p of m.products) {
          if (p._id === pid) {
            for (let k of Object.keys(product)) {
              p[k] = product[k];
            }
          }
        }
      }
    }
  },

  updateMember(state, payload) {
    const { uid, member } = payload;
    for (let m of state.members) {
      if (m._id === uid) {
        for (let k of Object.keys(member)) {
          m[k] = member[k];
        }
      }
    }
  },

  deleteMember(state, uid) {
    state.members = state.members.filter(m => m._id !== uid);
  },

  deleteProduct(state, payload) {
    const { uid, pid } = payload;
    for (let m of state.members) {
      if (m._id === uid) {
        m.products = m.products.filter(p => p._id !== pid);
      }
    }
  }
};
