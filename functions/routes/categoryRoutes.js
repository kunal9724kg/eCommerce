const router = require('express')
                    .Router();
const categoriesRef = require('firebase-admin')
                            .firestore()
                            .collection('category');

                            
router
    .route('/')
    .get(getAllCategories)
    .post(addNewCategory)
    .put(updateCategory)
    .delete(deleteCategory);


function getAllCategories(req, res) {
    categoriesRef
        .get()
        .then( (categories) => {
            return res.status(200).json({
                success: true,
                message: 'List of All Categories Received Successfully',
                data: {
                    categories: categories.docs.map(doc => doc.data())
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

function addNewCategory(req,res) {
    categoriesRef
        .doc(req.body.id)
        .set(req.body)
        .then( () => {
            
            return res.status(200).json({
                success: true,
                message: 'New Category Added Successfully'
            })   
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error
            })
        });
}

function updateCategory(req, res) {
    categoriesRef
    .doc(req.body.id)
    .update(req.body)
    .then( () => {
        return res.status(200).json({
            success: true,
            message: 'Category Updated Successfully'
        }) 
    })
    .catch( (error) => {
        return res.status(500).json({
            success: false,
            message: error
        })        
    });
}

function deleteCategory(req, res) {
    categoriesRef
    .doc(req.body.id)
    .delete()
    .then( () => {
        return res.status(200).json({
            success: true,
            message: 'Category Deleted Successfully'
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
