import axios from 'axios'
import {Message} from 'element-ui'
import Store from '@/store'

const instance = axios.create({
  baseURL: '/api/',
  timeout: 20000
})

instance.interceptors.request.use(
  config => config,
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

export function createUtil (name, data = {}) {
  return instance({
    url: name,
    method: 'POST',
    data
  })
}

export function removeUtil (name, id, data = {}) {
  return instance({
    url: `${name}/${id}`,
    method: 'DELETE',
    data
  })
}

export function updateUtil (name, id, data = {}) {
  return instance({
    url: `${name}/${id}`,
    method: 'PUT',
    data
  })
}

export function showUtil (name, id, params = {}) {
  return instance({
    url: `${name}/${id}`,
    method: 'GET',
    params
  })
}

export function indexUtil (name, params = {}) {
  return instance({
    url: name,
    method: 'GET',
    params
  })
}
