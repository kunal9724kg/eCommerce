import React, {useState, useEffect} from 'react';
import {Button} from "@material-ui/core";
import {addProduct, deleteProduct, updateProduct} from '../../../services/admin';
import SelectElements from "../../../constant/SelectElements"
import {getSubCategories} from  '../../../services/util' ;

const ModifyProduct = (props) => {
    const [productOld, setProductOld] = useState({...props.product})
    const [productNew, setProductNew] = useState(null)

    //const [subCategoriesList, setSubCategoriesList] = useState([SelectElements.chooseOption.name])

    useEffect(() => {
        console.log(props)
        setProductOld(props.product)
        setProductNew(productNew => ({...productNew, 'categoryId' : props.category}))
        setProductNew(productNew => ({...productNew, 'subCategoryId' : props.subCategory}))
    }, [props.product])

    function onChange(e){
        const {name, value} =e.target
        setProductNew(productnew => ({...productNew, [name] : value}))
        
    }


    function handleUpdate() {
        if(productNew.categoryId !== SelectElements.chooseOption.id) {
            updateProduct(productNew)
        }
    }

    function handleDelete() {
        if(productNew.categortyId !== SelectElements.chooseOption.id) {
            deleteProduct(productNew)
        }
    }

    function handleAdd() {
        if(productNew.categoryId !== SelectElements.chooseOption.id) {
            console.log(productNew)
            addProduct(productNew)
        }
    }

    if(productOld == null || Object.keys(productOld).length === 0) {
        return (
            <div>
               Choose Category and SubCategory
            </div>
        )
    } else{
        return (
            <div>
            <div>
                <div>
                    <h1>Name : </h1>
                    <input defaultValue = {productOld.name} name = {"name"} type={"text"} onChange ={onChange}/>
                </div>
            </div>
            <div>
                <div>
                    <h1>Id : </h1>
                    <input defaultValue = {productOld.id} name = {"id"} type ={"text"} onChange ={onChange}/>
                </div>
            </div>
            <div>
            <div>
                <h1>Price : </h1>
                <input defaultValue = {productOld.price} name = {"price"} type={"text"} onChange ={onChange}/>
            </div>
        </div>
        <div>
            <div>
                <h1>Stock Left : </h1>
                <input defaultValue = {productOld.stockLeft} name = {"stockLeft"} type ={"text"} onChange ={onChange}/>
            </div>
        </div>
        <div>
            <Button variant ="contained" color = "primary" onClick ={handleAdd}>
                Add
            </Button>
            <Button variant = "contained" color = "primary" onClick={handleUpdate}>
                Update
            </Button>
            <Button variant = "contained" color = "primary" onClick={handleDelete}>
                Delete
            </Button>
        </div>
     </div>
        )
    }

}

export default ModifyProduct;