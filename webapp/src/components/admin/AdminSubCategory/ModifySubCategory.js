import React, {useState, useEffect} from 'react';
import {Button} from "@material-ui/core";
import {addSubCategory, deleteSubCategory, updateSubCategory} from '../../../services/admin';
import SelectElements from "../../../constant/SelectElements";

const ModifySubCategory = (props) => {
  const [subCategoryOld, setSubCategoryOld] = useState({...props.subCategory})
  const [subCategoryNew, setSubCategoryNew] = useState({...props.subCategory})
  const [categories, setCategories] = useState({...props.categories})

  useEffect(() => {
    setSubCategoryOld(props.subCategory)
    setSubCategoryNew(props.subCategory)
    setCategories(props.categories)
  }, [props.subCategory])

  useEffect(() => {
    setCategories(props.categories)
  }, [props.categories])

  function onChange(e) {
    const {name, value} = e.target
    setSubCategoryNew(subCategoryNew => ({...subCategoryNew, [name]: value}))
  }

  function handleUpdate() {
      if(subCategoryNew.categoryId !== SelectElements.chooseOption.id) {
        updateSubCategory(subCategoryNew)
      }
  }

  function handleDelete() {
    if(subCategoryNew.categoryId !== SelectElements.chooseOption.id) {
      deleteSubCategory(subCategoryNew)
    }
  }

  function handleAdd() {
    if(subCategoryNew.categoryId !== SelectElements.chooseOption.id) {
      addSubCategory(subCategoryNew)
    }
  }
  
  if(subCategoryOld == null || Object.keys(subCategoryOld).length === 0) {
    return (
      <div>
        Choose Category and SubCategory......
      </div>
    )
  } else{
    return (
      <div>
        <div>
          <h1>Name:</h1>
          <input defaultValue={subCategoryOld.name} name={"name"} type={"text"} onChange={onChange}/>
        </div>
        <div>
          <h1>Id:</h1>
          <input defaultValue={subCategoryOld.id} name={"id"} type={"text"} onChange={onChange}/>
        </div>
        <div>
          <select defaultValue={subCategoryOld.categoryId} name={"categoryId"} onChange={onChange}>
            {categories
              .map((category, idx) => {
                return (
                  <option
                    key = {idx}
                    value={category.id}>
                    {category.name}
                  </option>
                )})}
          </select>
        </div>
        <div>
          <Button variant="contained" color="primary" onClick={handleAdd}>
            Add
          </Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
          <Button variant="contained" color="primary" onClick={handleDelete}>
            Delete
          </Button>
        </div>
      </div>
    )
  }
}

export default ModifySubCategory;