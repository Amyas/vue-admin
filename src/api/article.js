import {fetchUtil} from '@/utils/fetch'

export function fetchIndex (data = {}) {
  return fetchUtil('article', {
    data,
    loading: 'article.list.loading'
  })
}
export function fetchCreate (data = {}) {
  return fetchUtil('article', {
    method: 'POST',
    data,
    loading: 'article.form.loading'
  })
}
export function fetchUpdate (id, data = {}) {
  return fetchUtil('article', {
    method: 'PUT',
    id,
    data,
    loading: 'article.form.loading'
  })
}
export function fetchRemove (id, data = {}) {
  return fetchUtil('article', {
    method: 'DELETE',
    id,
    data,
    loading: 'article.list.loading'
  })
}
