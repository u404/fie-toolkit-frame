import <%= CompName %> from './main'

/* istanbul ignore next */
<%= CompName %>.install = function(Vue) {
  Vue.component(<%= CompName %>.name, <%= CompName %>)
}

export default <%= CompName %>