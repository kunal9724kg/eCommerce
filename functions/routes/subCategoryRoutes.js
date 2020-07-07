const router = require('express')
                    .Router();
const subCategoriesRef = require('firebase-admin')
                            .firestore()
                            .collection('subCategory');
const SubCategory = require('../model/SubCategory')

                            
router
    .route('/')
    .get(getAllSubCategories)
    .post(addNewSubCategory)
    .put(updateSubCategory)
    .delete(deleteSubCategory);


function getAllSubCategories(req, res) {
    subCategory = req.query.subCategory
    subCategoriesQueryRef = subCategoriesRef

    if(subCategory !== undefined) {
        subCategory = JSON.parse(subCategory)

        categoryId = subCategory.categoryId
        if(categoryId !== undefined) {
            subCategoriesQueryRef = subCategoriesQueryRef
                                        .where("categoryId", "=", categoryId)
        }
    }

    subCategoriesQueryRef
        .get()
        .then( (subCategories) => {
            return res.status(200).json({
                success: true,
                message: 'List of All Sub-Categories Received Successfully',
                data: {
                    subCategories: subCategories
                                    .docs
                                    .map(doc => SubCategory
                                        .getSubCategoryConverter()
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

function addNewSubCategory(req,res) {
    try{
        subCategory = new SubCategory(req.body.subCategory);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }
    
    return subCategoriesRef
            .doc(subCategory.id)
            .withConverter(SubCategory.getSubCategoryConverter())
            .set(Object.assign({}, subCategory))
            .then( () => {
                
                return res.status(200).json({
                    success: true,
                    message: 'New Sub-Category with id '+ subCategory.id +' Added Successfully'
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
    try{
        subCategory = new SubCategory(req.body.subCategory);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }

    return subCategoriesRef
            .doc(subCategory.id)
            .withConverter(SubCategory.getSubCategoryConverter())
            .update(Object.assign({},subCategory))
            .then( () => {
                return res.status(200).json({
                    success: true,
                    message: 'Sub-Category '+subCategory.id+' Updated Successfully'
                }) 
            })
            .catch( (error) => {
                console.log(error);
                return res.status(500).json({
                    success: false,
                    message: error
                })        
            });
}

function deleteSubCategory(req, res) {
    try{
        subCategory = new SubCategory(req.body.subCategory);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }

    return subCategoriesRef
            .doc(subCategory.id)
            .delete()
            .then( () => {
                return res.status(200).json({
                    success: true,
                    message: 'Sub-Category '+subCategory.id+' Deleted Successfully'
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
