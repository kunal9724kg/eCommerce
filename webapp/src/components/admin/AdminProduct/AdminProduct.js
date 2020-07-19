import React, {useState, useEffect} from 'react';
import {getProducts, getSubCategories, getCategories} from '../../../services/util';
import SelectElements from '../../../constant/SelectElements';
import ModifyProduct from "./ModifyProduct";

function AdminProduct() {
  const [ subCategories, setSubCategories] = useState([SelectElements.chooseOption])
  const [ categories, setCategories ] = useState([SelectElements.chooseOption])
  const [ products, setProducts ] = useState([
                                        SelectElements.chooseOption,
                                        SelectElements.newProductOption]) 
  const [ categoryId, setCategoryId] = useState([SelectElements.chooseOption.id])
  const [ subCategoryId, setSubCategoryId] = useState([SelectElements.chooseOption.id])
  const [ productId, setproductId] = useState([SelectElements.chooseOption.id])
  const [ subCategoryShow, setSubCategoryShow] = useState(null)
  const [ productShow, setProductShow] = useState(null)
  
  async function fetchProducts(subCategory) {
    let res = await getProducts(subCategory)
    res = [SelectElements.chooseOption].concat(res)
    res.push(SelectElements.newProductOption)
    setProducts(res)
  }

  async function fetchSubCategories(category) {
    let res = await getSubCategories(category)
    res = [SelectElements.chooseOption].concat(res)
    res.push(SelectElements.newSubCategoryOption)
    setSubCategories(res)
  }

  async function fetchCategories() {
    let res = await getCategories()
    res = [SelectElements.chooseOption].concat(res)
    setCategories(res)
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  useEffect (() => {
    setSubCategoryId(SelectElements.chooseOption.id)
    setSubCategoryId([SelectElements.chooseOption])
    fetchSubCategories(categoryId)
  }, [categoryId])

  useEffect(() => {
    setproductId(SelectElements.chooseOption.id)
    setproductId([SelectElements.chooseOption])
    fetchProducts(subCategoryId)
  }, [subCategoryId])

  let productsList = products
                        .map((product, idx) =>{
                          return (
                            <option
                            key = {idx}
                            value = {product.id}>
                              {product.name}
                            </option>
                          )
                        })

  let subCategoriesList = subCategories
                            .map((subCategory, idx) => {
                              return (
                                <option
                                  key = {idx}
                                  value = {subCategory.id}>
                                    {subCategory.name}
                                  </option>
                              )
                            })
                
  let categoriesList = categories
                          .map((category, idx) => {
                            return (
                              <option
                              key ={idx}
                              value = {category.id}>
                                {category.name}
                              </option>
                            )
                          })
  
useEffect(() => {
  if(categoryId !== SelectElements.chooseOption.id && categoryId !== SelectElements.newSubCategoryOption.id){
    if(subCategoryId !== SelectElements.chooseOption.id){
      if(subCategoryId === SelectElements.newSubCategoryOption){
        setSubCategoryShow({})
        return;
      }
      const subCat = subCategories.find(obj => obj.id === subCategoryId)
      console.log(subCat)
      setSubCategoryShow(subCat)
      return;
    }
  }
  setSubCategoryShow(null)
}, [subCategoryId])

useEffect(() => {
  if(subCategoryId !== SelectElements.chooseOption.id && subCategoryId !== SelectElements.newSubCategoryOption.id){
    if(productId !== SelectElements.chooseOption.id){
      if(productId === SelectElements.newProductOption){
        setProductShow({})
        return;
      }
      const prod = products.find(obj => obj.id === productId)
      setProductShow(prod)
      return;
    }
  }
  setProductShow(null)
}, [productId])


return (
  <div>
    <div>
      <select value = {categoryId} onChange = {(event) => setCategoryId(event.target.value)}>
        {categoriesList}
      </select>
    </div>

    <div>
      <select value = {subCategoryId} onChange = {(event) => setSubCategoryId(event.target.value)}>
        {subCategoriesList}
      </select>
    </div>

    <div>
      <select value = {productId} onChange = {(event) => setproductId(event.target.value)}>
        {productsList}
      </select>
    </div>
    <div></div>
    <div></div>
    <ModifyProduct product = {productShow} subCategory ={subCategoryId} categories ={categoryId}/>
  </div>
)



}

export default AdminProduct;