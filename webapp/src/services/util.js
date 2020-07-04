import axios from 'axios';
import {GET_SUB_CATEGORIES} from '../api/util';
import SubCategory from '../model/SubCategory';

export function getSubCategories() {
    return axios
            .get(GET_SUB_CATEGORIES.url)
            .then(res => {
                const success = res.data.success
                if(success === false)
                    return null;
                try {
                    return res
                            .data
                            .data
                            .subCategories
                            .map(subCategory => new SubCategory(subCategory))
                } catch(error) {
                    return null
                }
            })
}