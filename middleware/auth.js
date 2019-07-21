export default function(context) {
  // console.log("In the middleware");
  if (!context.store.getters.isLogin) {
    context.redirect("/auth/login");
  }
}
