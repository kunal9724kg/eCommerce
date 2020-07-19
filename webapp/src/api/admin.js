import API_PREFIX from "./main";

export const SUBCATEGORY_API = {
  UPDATE: {
    url: API_PREFIX + '/subCategory',
    method: 'PUT'
  },
  DELETE: {
    url: API_PREFIX + '/subCategory',
    method: 'DELETE'
  },
  ADD: {
    url: API_PREFIX + '/subCategory',
    method: 'POST'
  }
}

export const PRODUCT_API = {
  UPDATE : {
    url : API_PREFIX + '/product',
    method : 'PUT'
  },
  DELETE : {
     url : API_PREFIX + '/product',
     method : 'DELETE'
  },
  ADD: {
    url : API_PREFIX + '/product',
    method : 'POST'
  }
}