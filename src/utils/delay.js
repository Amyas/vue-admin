import Vue from 'vue'

export function delay (time) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, time)
  })
}

export default {
  install () {
    Vue.prototype.$delay = delay
  }
}
