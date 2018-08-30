import axios from 'axios'
import {Message} from 'element-ui'
import Store from '@/store'

const instance = axios.create({
  baseURL: '/api/',
  timeout: 20000
})

instance.interceptors.request.use(
  config => {
    if (config.url !== '/api/login') {
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
    Message.error(`请求失败, 状态码:${response.status}, 错误信息:${response.data.errMsg}`)
    return Promise.reject(error)
  }
)

export async function fetchUtil (name, options = {}) {
  const {data = {}, loading} = options

  loading && Store.commit('SET_STATE', {k: loading, v: true})
  try {
    const response = await instance({
      url: name,
      method: 'POST',
      data
    })
    return response
  } catch (error) {
    throw error
  } finally {
    loading && Store.commit('SET_STATE', {k: loading, v: false})
  }
}

export async function indexUtil (name, options = {}) {
  const {params = {}, loading} = options

  loading && Store.commit('SET_STATE', {k: loading, v: true})
  try {
    const response = await instance({
      url: name,
      method: 'GET',
      params
    })
    return response
  } catch (error) {
    throw error
  } finally {
    loading && Store.commit('SET_STATE', {k: loading, v: false})
  }
}

export async function removeUtil (name, id, options = {}) {
  const {data = {}, loading} = options

  loading && Store.commit('SET_STATE', {k: loading, v: true})
  try {
    const response = await instance({
      url: `${name}/${id}`,
      method: 'DELETE',
      data
    })
    return response
  } catch (error) {
    throw error
  } finally {
    loading && Store.commit('SET_STATE', {k: loading, v: false})
  }
}

export async function updateUtil (name, id, options = {}) {
  const {data = {}, loading} = options

  loading && Store.commit('SET_STATE', {k: loading, v: true})
  try {
    const response = await instance({
      url: `${name}/${id}`,
      method: 'PUT',
      data
    })
    return response
  } catch (error) {
    throw error
  } finally {
    loading && Store.commit('SET_STATE', {k: loading, v: false})
  }
}

export async function createUtil (name, options = {}) {
  const {data = {}, loading} = options

  loading && Store.commit('SET_STATE', {k: loading, v: true})
  try {
    const response = await instance({
      url: name,
      method: 'POST',
      data
    })
    return response
  } catch (error) {
    throw error
  } finally {
    loading && Store.commit('SET_STATE', {k: loading, v: false})
  }
}

export function showUtil (name, id, params = {}) {
  return instance({
    url: `${name}/${id}`,
    method: 'GET',
    params
  })
}
