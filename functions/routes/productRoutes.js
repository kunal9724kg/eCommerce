const router = require('express')
                    .Router();
const productsRef = require('firebase-admin')
                                .firestore()
                                .collection('product');
const Product = require('../model/Product')

router
    .route('/')
    .get(getAllProducts)
    .post(addNewProduct)
    .put(updateProduct)
    .delete(deleteProduct);

    
function getAllProducts(req, res) {
    product = req.query.product
    productQueryRef = productsRef

    if(product != undefined) {
        subCategoryId = product.subCategoryId
        if(subCategoryId != undefined) {
            productQueryRef = productQueryRef
                            .where("subCategoryId", "=", subCategoryId)
        }

        categoryId = product.categoryId
        if(categoryId != undefined) {
            productQueryRef = productQueryRef
                            .where("categoryId", "=", categoryId)
        }
    }

    productQueryRef
        .get()
        .then( (products) => {
            return res.status(200).json({
                success: true,
                message: 'List of All Products Received Successfully',
                data: {
                    products: products
                                .docs
                                .map(doc => Product
                                    .getProductConverter()
                                    .fromFirestore(doc))
                }
            })
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        });
}

function addNewProduct(req,res) {
    try{
        product = new Product(req.body.product);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }

    productsRef
        .doc(product.id)
        .withConverter(Product.getProductConverter())
        .set(Object.assign({}, product))
        .then( () => {    
            return res.status(200).json({
                success: true,
                message: 'New Product with id '+product.id+' Added Successfully'
            })   
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error
            })
        });
}

function updateProduct(req, res) {
    try{
        product = new Product(req.body.product);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }

    productsRef
        .doc(product.id)
        .withConverter(Product.getProductConverter())
        .update(Object.assign({}, product))
        .then( () => {    
            return res.status(200).json({
                success: true,
                message: 'Product with id '+product.id+' Updated Successfully'
            })   
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error
            })
        });
}  

function deleteProduct(req, res) {
    try{
        product = new Product(req.body.product);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }
    
    productsRef
        .doc(product.id)
        .delete()
        .then( () => {
            return res.status(200).json({
                success: true,
                message: 'Product with id '+product.id+' Deleted Successfully'
            })
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error
            }) 
        });
}



    module.exports = router;