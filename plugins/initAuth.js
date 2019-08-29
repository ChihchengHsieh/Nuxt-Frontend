export default  async ({ store }) =>{
  // console.log("initAuth plugin")
  await store.dispatch("nuxtClientSPAInit");
  // throw new Error(error.response.data.msg);
}
