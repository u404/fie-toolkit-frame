import Vue from "vue"
import VueRouter from "vue-router"

import routeConfig from "./route.config.json"

const routes = Object.keys(routeConfig).map(key => ({
  path: `${routeConfig[key]}`,
  name: key,
  component: () => import(`./components/${key}.vue`)
  // r => require.ensure([], () =>
  //   r(require(`./components/${key}.vue`)),
  // "es")
}))

Vue.use(VueRouter)

export default new VueRouter({
  routes
})
