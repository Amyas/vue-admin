import Vue from 'vue'

export function delay (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export function changeQuery ({key, val}) {
  const query = {
    ...this.$route.query,
    [key]: val
  }
  if (!val) {
    delete query[key]
  }

  if (key === 'pageSize') {
    query['pageNumber'] = 1
  }

  this.$router.push({
    ...this.$route,
    query
  })
}

export default {
  install () {
    Vue.prototype.$delay = delay
    Vue.prototype.$changeQuery = changeQuery
  }
}
