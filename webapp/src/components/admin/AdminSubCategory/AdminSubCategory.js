import React, {useState, useEffect} from 'react';
import {getSubCategories, getCategories, getProducts} from '../../../services/util';
import SelectElements from '../../../constant/SelectElements';
import ModifySubCategory from "./ModifySubCategory";

const AdminSubCategory = () => {
  const [subCategories, setSubCategories] = useState([
                                                SelectElements.chooseOption,
                                                SelectElements.newSubCategoryOption])
  const [categories, setCategories] = useState([SelectElements.chooseOption])
  const [subCategoryId, setSubCategoryId] = useState(SelectElements.chooseOption.id)
  const [categoryId, setCategoryId] = useState(SelectElements.chooseOption.id)
  const [subCategoryShow, setSubCategoryShow] = useState(null)

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

  useEffect(() => {
    setSubCategoryId(SelectElements.chooseOption.id)
    setSubCategories([SelectElements.chooseOption, SelectElements.newSubCategoryOption])
    fetchSubCategories(categoryId)
  }, [categoryId])

  let subCategoriesList = subCategories
                            .map((subCategory, idx) => {
                              return (
                                <option
                                    key={idx}
                                    value={subCategory.id}>
                                  {subCategory.name}
                                </option>
                              )
                            })

  let categoryList = categories
                        .map((category, idx) => {
                          return (
                            <option
                                key = {idx}
                                value={category.id}>
                              {category.name}
                            </option>
                          )
                        })

  useEffect(() => {
    if(categoryId !== SelectElements.chooseOption.id && categoryId !== SelectElements.newSubCategoryOption.id) {
      if (subCategoryId !== SelectElements.chooseOption.id) {
        if(subCategoryId === SelectElements.newSubCategoryOption) {
          setSubCategoryShow({})
          return;
        }
        const subCat = subCategories.find(obj => obj.id === subCategoryId)
        setSubCategoryShow(subCat)
        return;
      }
    }
    setSubCategoryShow(null)
  }, [subCategoryId])


  return (
      <div>
        <div>
          <select value={categoryId} onChange={(event) => setCategoryId(event.target.value)}>
            {categoryList}
          </select>
        </div>

        <div>
          <select value={subCategoryId} onChange={(event) => setSubCategoryId(event.target.value)}>
            {subCategoriesList}
          </select>
        </div>
        <div></div>
        <div></div>

        <ModifySubCategory subCategory={subCategoryShow} categories={categories}/>
      </div>
  )
}

export default AdminSubCategory;