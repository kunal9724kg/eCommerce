const router = require('express')
                    .Router();
const categoriesRef = require('firebase-admin')
                            .firestore()
                            .collection('category');
const Category = require('../model/Category')

                            
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
                    categories: categories
                                    .docs
                                    .map(doc => Category
                                        .getCategoryConverter()
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

function addNewCategory(req,res) {
    try{
        category = new Category(req.body.category);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }

    categoriesRef
        .doc(category.id)
        .withConverter(Category.getCategoryConverter())
        .set(Object.assign({},category))
        .then( () => {
            return res.status(200).json({
                success: true,
                message: 'New Category with id '+ category.id +' Added Successfully'
            })   
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error.message
            })
        });
}

function updateCategory(req, res) {
    try{
        category = new Category(req.body.category);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }

    categoriesRef
        .doc(category.id)
        .withConverter(Category.getCategoryConverter())
        .update(Object.assign({},category))
        .then( () => {
            return res.status(200).json({
                success: true,
                message: 'Category '+category.id+' Updated Successfully'
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

function deleteCategory(req, res) {
    try{
        category = new Category(req.body.category);
    }
    catch(error){
        return res.status(400).json({
			success: false,
			message: error.message
		});
    }

    categoriesRef
        .doc(category.id)
        .delete()
        .then( () => {
            return res.status(200).json({
                success: true,
                message: 'Category '+category.id+' Deleted Successfully'
            })
        })
        .catch( (error) => {
            return res.status(500).json({
                success: false,
                message: error.message
            }) 
        });
}



module.exports = router;
