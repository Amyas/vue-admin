import {createUtil, updateUtil, indexUtil, removeUtil} from '@/utils/fetch'

export function fetchCreate (data = {}) {
  return createUtil('user', {
    data,
    loading: 'user.form.loading'
  })
}
export function fetchUpdate (id, data = {}) {
  return updateUtil('user', id, {
    data,
    loading: 'user.form.loading'
  })
}
export function fetchIndex (params = {}) {
  return indexUtil('user', {
    params,
    loading: 'user.list.loading'
  })
}
export function fetchRemove (id, data = {}) {
  return removeUtil('user', id, {
    data,
    loading: 'user.list.loading'
  })
}
