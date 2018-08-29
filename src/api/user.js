import {indexUtil, removeUtil} from '@/utils/fetch'

export function fetchIndex (params = {}) {
  return indexUtil('user', {
    params,
    loading: 'user.list.isLoading'
  })
}

export function fetchRemove (id, data = {}) {
  return removeUtil('user', id, {
    data,
    loading: 'user.list.isLoading'
  })
}
