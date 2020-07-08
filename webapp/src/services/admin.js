import axios from 'axios';
import {SUBCATEGORY_API} from '../api/admin';
import SubCategory from '../model/SubCategory'

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
      .post(SUBCATEGORY_API.UPDATE.url, {subCategory: subCategory})
      .then((res) => {
        return res.data
      })
      .catch((err) => {
        return err
      })
}


