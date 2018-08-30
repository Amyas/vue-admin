const directives = {
  focus: {
    inserted: function (el) {
      el.children[0].focus()
    }
  }
}

export default Vue => {
  Object.keys(directives).forEach(v => {
    Vue.directive(v, directives[v])
  })
}
