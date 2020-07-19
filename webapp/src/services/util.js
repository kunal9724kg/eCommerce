import axios from 'axios';
import {GET_SUB_CATEGORIES, GET_CATEGORIES, GET_PRODUCTS} from '../api/util';
import SubCategory from '../model/SubCategory';
import Category from '../model/Category';
import Product from '../model/Product';

export function getProducts(subCategory){
    const params = {
        product : {
            subCategoryId : subCategory
        }
    }

    return axios
            .get(GET_PRODUCTS.url, {params: params})
            .then(res => {
                const success = res.data.success
                if(success === false)
                    return [];
                try {
                    return res
                            .data   
                            .data
                            .products
                            .map(product => new Product(product))
                } catch(error){
                    return []
                }
            })
}

export function getSubCategories(category) {
    const params = {
      subCategory : {
        categoryId: category
      }
    }

    return axios
            .get(GET_SUB_CATEGORIES.url, {params: params})
            .then(res => {
                const success = res.data.success
                if(success === false)
                    return [];
                try {
                    return res
                            .data
                            .data
                            .subCategories
                            .map(subCategory => new SubCategory(subCategory))
                } catch(error) {
                    return []
                }
            })
}

export function getCategories() {
    return axios
            .get(GET_CATEGORIES.url)
            .then(res => {
                const success = res.data.success
                if(success === false)
                    return [];
                try {
                    return res
                            .data
                            .data
                            .categories
                            .map(category => new Category(category))
                } catch(error) {
                    return []
                }
            })
}