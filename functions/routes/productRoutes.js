const router = require('express')
                    .Router();
const productsRef = require('firebase-admin')
                                .firestore()
                                .collection('product');


router
    .route('/')
    .get(getAllproducts)
    .post(addNewproduct)
    .put(updateproduct)
    .delete(deleteproduct);

    
function getAllproducts(req, res) {
    productsRef
        .get()
        .then( (products) => {
            return res.status(200).json({
                success: true,
                message: 'List of All Products Received Successfully',
                data: {
                    products: products.docs.map(doc => doc.data())
                }
            })
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error
            })
        });
}

function addNewproduct(req,res) {
    productsRef
        .doc(req.body.id)
        .set(req.body)
        .then( () => {    
            return res.status(200).json({
                success: true,
                message: 'New Product Added Successfully'
            })   
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error
            })
        });
}

function updateproduct(req, res) {
    productsRef
    .doc(req.body.id)
    .update(req.body)
    .then( () => {
        return res.status(200).json({
            success: true,
            message: 'Product Updated Successfully'
        }) 
    })
    .catch( (error) => {
        return res.status(500).json({
            success: false,
            message: error
        })        
    });
}  

function deleteproduct(req, res) {
        productsRef
        .doc(req.body.id)
        .delete()
        .then( () => {
            return res.status(200).json({
                success: true,
                message: 'Product Deleted Successfully'
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