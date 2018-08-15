import request from '@/utils/request'

export function addVendor(vendor) {
  return request({
    url: '/vendor',
    method: 'post',
    data: JSON.stringify(vendor)
  })
}

export function vendorList(param) {
  return request({
    url: '/vendors',
    method: 'get'
  })
}
