import React from 'react';
import {getSubCategories} from '../../../services/util'

function AdminSubCategory() {
  getSubCategories()
    .then(subcategories => console.log(subcategories))
  return (
    <h1>Admin SubCategory....</h1>
  );
}

export default AdminSubCategory;