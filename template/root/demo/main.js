import Vue from "vue"

import UI from "@src/index.js"
import app from "./app"
import router from "./router"

import "@demo/common/styles/reset.scss"
import "@theme/index.scss"

Vue.use(UI)

new Vue({
  ...app,
  router
}).$mount("#app")
