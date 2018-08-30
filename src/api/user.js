import {fetchUtil} from '@/utils/fetch'

export function fetchCreate (data = {}) {
  return fetchUtil('user', {
    data,
    loading: 'user.form.loading'
  })
}
export function fetchUpdate (id, data = {}) {
  return fetchUtil('user', {
    id,
    data,
    loading: 'user.form.loading'
  })
}
export function fetchIndex (data = {}) {
  return fetchUtil('user', {
    data,
    loading: 'user.list.loading'
  })
}
export function fetchRemove (id, data = {}) {
  return fetchUtil('user', id, {
    id,
    data,
    loading: 'user.list.loading'
  })
}
