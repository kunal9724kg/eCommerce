import React, {useState, useEffect} from 'react';
import { TextField } from '@material-ui/core';
import {getSubCategories, getCategories} from '../../../services/util';

const AdminSubCategory = () => {
  let chooseOption = {
    "id": "Choose",
    "name": "Choose Option....."
  }
  let newSubCategoryOption = {
    "id": "New",
    "name": "New Sub Category"
  }
  const [categoriesLoad, setCategoriesLoad] = useState(false)
  const [subCategoriesLoad, setSubCategoriesLoad] = useState(false)
  const [subCategories, setSubCategories] = useState([])
  const [categories, setCategories] = useState([])
  const [subCategory, setSubCategory] = useState(0)
  const [category, setCategory] = useState(null)
  

  async function fetchSubCategories() {
    let res = await getSubCategories()
    res = [chooseOption].concat(res)
    res.push(newSubCategoryOption)
    setSubCategories(res)
    setSubCategoriesLoad(true)
  }

  async function fetchCategories() {
    let res = await getCategories()
    res = [chooseOption].concat(res)
    setCategories(res)
    setCategoriesLoad(true)
  }

  useEffect(() => {
    fetchSubCategories()
    fetchCategories()
  }, [])

  useEffect(() => {
    console.log(category)
  }, [category])

  let subCategoriesList = subCategories
                            .map((subCategory, idx) => {
                              return ( 
                                <option 
                                    key={subCategory.id} 
                                    value={idx}>
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

  if(!categoriesLoad || !subCategoriesLoad) {
    return (
      <h1>Loading.....</h1>
    )
  } else {
    return (
      <div>
        <select value={subCategory} onChange={(event) => setSubCategory(event.target.value)}>
          {subCategoriesList}
        </select>
        <div>
          <h1>Id:</h1>
          <TextField id="outlined-basic" label="Outlined" value={subCategories[subCategory].id} variant="outlined" />
        </div>
        <div>
          <h1>Name:</h1>
          <TextField id="outlined-basic" label="Outlined" value={subCategories[subCategory].name} variant="outlined" />
        </div>
        <div>
          <h1>Category:</h1>
          <select value={subCategories[subCategory].categoryId} onChange={(event) => setCategory(event.target.value)}>
            {categoryList}
          </select>
        </div>
      </div>
    )
  }
}

export default AdminSubCategory;