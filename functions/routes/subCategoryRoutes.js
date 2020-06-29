const router = require('express')
                    .Router();
const subCategoriesRef = require('firebase-admin')
                                .firestore()
                                .collection('subCategory');


router
    .route('/')
    .get(getAllSubCategories)
    .post(addNewSubCategory)
    .put(updateSubCategory)
    .delete(deleteSubCategory);

    
function getAllSubCategories(req, res) {
    subCategoriesRef
        .get()
        .then( (subCategories) => {
            return res.status(200).json({
                success: true,
                message: 'List of All Sub-Categories Received Successfully',
                data: {
                    subCategories: subCategories.docs.map(doc => doc.data())
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

function addNewSubCategory(req,res) {
    subCategoriesRef
        .doc(req.body.id)
        .set(req.body)
        .then( () => {    
            return res.status(200).json({
                success: true,
                message: 'New Sub-Category Added Successfully'
            })   
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error
            })
        });
}

function updateSubCategory(req, res) {
    subCategoriesRef
    .doc(req.body.id)
    .update(req.body)
    .then( () => {
        return res.status(200).json({
            success: true,
            message: 'Sub-Category Updated Successfully'
        }) 
    })
    .catch( (error) => {
        return res.status(500).json({
            success: false,
            message: error
        })        
    });
}  

function deleteSubCategory(req, res) {
        subCategoriesRef
        .doc(req.body.id)
        .delete()
        .then( () => {
            return res.status(200).json({
                success: true,
                message: 'Sub-Category Deleted Successfully'
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