import React, {useState, useEffect} from 'react';
import {getSubCategories} from '../../../services/util';

const AdminSubCategory = () => {
  const [loading, setLoading] = useState(true)
  const [subCategories, setSubCategories] = useState("Hi")

  async function fetchSubCategories() {
    const res = await getSubCategories()
    if(res != null) {
      setSubCategories(res)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchSubCategories()
  }, [])

  if(loading) {
    return (
      <h1>Loading.....</h1>
    )
  } else {
    return (
      <div>
        {JSON.stringify(subCategories)}
      </div>
    )
  }
}

export default AdminSubCategory;