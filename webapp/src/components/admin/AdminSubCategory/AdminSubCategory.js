import React, {useState, useEffect} from 'react';
import { select } from '@material-ui/core';
import {getSubCategories} from '../../../services/util';

const AdminSubCategory = () => {
  let choseSubCategory = {
    "id": "Choose",
    "name": "Choose Sub Category"
  }
  let newSubCategoryOption = {
    "id": "New",
    "name": "New Sub Category"
  }
  const [loading, setLoading] = useState(true)
  const [subCategories, setSubCategories] = useState("Hi")
  const [subCategory, setSubCategory] = useState(0)
  

  async function fetchSubCategories() {
    let res = await getSubCategories()
    if(res != null) {
      res = [choseSubCategory].concat(res)
      res.push(newSubCategoryOption)
      setSubCategories(res)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSubCategories()
  }, [])

  useEffect(() => {
    console.log(subCategories[subCategory])
  }, [subCategory])

  if(loading) {
    return (
      <h1>Loading.....</h1>
    )
  } else {
    return (
      <div>
        <select value={subCategory} onChange={(event) => setSubCategory(event.target.value)}>
          {subCategories
            .map((subCategory, idx) => <option 
                                          key={subCategory.id} 
                                          value={idx}>
                                        {subCategory.name}
                                      </option>)}
        </select>
      </div>
    )
  }
}

export default AdminSubCategory;