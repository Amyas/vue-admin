import {fetchUtil} from '@/utils/fetch'

export function fetchIndex (data = {}) {
  return fetchUtil('user', {
    data,
    loading: 'user.list.loading'
  })
}
export function fetchCreate (data = {}) {
  return fetchUtil('user', {
    method: 'POST',
    data,
    loading: 'user.form.loading'
  })
}
export function fetchUpdate (id, data = {}) {
  return fetchUtil('user', {
    method: 'PUT',
    id,
    data,
    loading: 'user.form.loading'
  })
}
export function fetchRemove (id, data = {}) {
  return fetchUtil('user', {
    method: 'DELETE',
    id,
    data,
    loading: 'user.list.loading'
  })
}

export function fetchRemoveBatch (data = {}) {
  return fetchUtil('user/destroyBatch', {
    method: 'POST',
    data,
    loading: 'user.list.loading'
  })
}
