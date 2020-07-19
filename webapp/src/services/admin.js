import axios from 'axios';
import {SUBCATEGORY_API, PRODUCT_API} from '../api/admin';
import SubCategory from '../model/SubCategory';
import Product from '../model/Product';

export function updateProduct(product){
  product = new Product(product)
  axios
      .put(PRODUCT_API.UPDATE.url, {product: product})
      .then((res) => {
        return res.data
      })
      .catch((err) =>{
        return err
      })
}

export function deleteProduct(product){
  product = new Product(product)
  axios
      .delete(PRODUCT_API.DELETE.url, {
        data: {
          product : product
        }
      })
      .then((res) => {
        return res.data
      })
      .catch((err) =>{
        return err
      })
}

export function addProduct(product){
  product = new Product(product)
  axios
      .put(PRODUCT_API.ADD.url, {product : product})
      .then((res) => {
        return res.data
      })
      .catch((err) =>{
        return err
      })
}

export function updateSubCategory(subCategory) {
  subCategory = new SubCategory(subCategory)
  axios
      .put(SUBCATEGORY_API.UPDATE.url, {subCategory: subCategory})
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
}

export function deleteSubCategory(subCategory) {
  subCategory = new SubCategory(subCategory)
  axios
      .delete(SUBCATEGORY_API.UPDATE.url, {
        data: {
          subCategory: subCategory
        }
      })
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
}

export function addSubCategory(subCategory) {
  subCategory = new SubCategory(subCategory)
  axios
      .post(SUBCATEGORY_API.ADD.url, {subCategory: subCategory})
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
}


