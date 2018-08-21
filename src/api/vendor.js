import request from '@/utils/request'

export function addVendor(vendor) {
  return request({
    url: '/vendor',
    method: 'post',
    data: JSON.stringify(vendor)
  })
}

export function addVendors(vendors) {
  return request({
    url: '/vendors',
    method: 'post',
    data: JSON.stringify(vendors)
  })
}

export function vendorList(param) {
  return request({
    url: '/vendors',
    method: 'get'
  })
}
export function getVendorById(id) {
  return request({
    url: '/vendor/' + id,
    method: 'get'
  })
}

