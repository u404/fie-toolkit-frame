<%= importTpl %>
<%= importDirectives %>
<%= importFilters %>
import locale from './locale'

const components = [
<%= listTpl %>
]

const directives = {
<%= listDirectives %>
}

const filters = {
<%= listFilters %>
}

const install = function(Vue, opts = {}) {
  locale.use(opts.locale)
  locale.i18n(opts.i18n)

  components.forEach(component => {
    Vue.use(component)
  })

  Object.keys(directives).forEach(key => {
    Vue.directive(directives[key].name || key, directives[key])
  })

  Object.keys(filters).forEach(key => {
    Vue.filter(key, filters[key])
  })

}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

export default {
  version: '<%= version %>',
  locale: locale.use,
  i18n: locale.i18n,
  install,
  directives,
  filters,
<%= listTpl %>
}