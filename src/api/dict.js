import request from '@/utils/request'

export function getDict(id) {
  return request({
    url: '/dictionary/define/' + id,
    method: 'get'
  })
}

export function queryDictForMap() {
  return request({
    url: '/dict/allMap',
    method: 'get'
  })
}
