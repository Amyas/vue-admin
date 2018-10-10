import axios from 'axios'
import {Message} from 'element-ui'
import Store from '@/store'

const instance = axios.create({
  baseURL: '/api/',
  timeout: 20000
})

instance.interceptors.request.use(
  config => {
    if (config.url !== 'login') {
      const token = Store.getters['login/token']
      config.headers['authorization'] = token
    }
    return config
  },
  error => Promise.reject(error)
)

instance.interceptors.response.use(
  response => response.data,
  error => {
    const {response} = error
    response && Message.error(`请求失败, 状态码:${response.status}, 错误信息:${response.data.errMsg}`)
    return Promise.reject(error)
  }
)

export async function fetchUtil (name, options = {}) {
  const {
    method = 'GET',
    data = {},
    loading
  } = options

  const opt = {}

  if (method === 'GET') {
    opt['params'] = data
  } else if (method === 'PUT' || method === 'DELETE') {
    name = `${name}/${options.id}`
    opt['data'] = data
  } else {
    opt['data'] = data
  }

  opt['url'] = name
  opt['method'] = method

  loading && Store.commit('SET_STATE', {k: loading, v: true})
  try {
    const response = await instance(opt)
    return response
  } catch (error) {
    throw error
  } finally {
    loading && Store.commit('SET_STATE', {k: loading, v: false})
  }
}
