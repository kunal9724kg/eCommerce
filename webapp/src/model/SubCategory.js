class SubCategory {
    constructor(subCategory) {
        if(subCategory === undefined){
            throw new Error('Send Sub-Category');
        }
        if(subCategory.id === undefined){
            throw new Error('Send Sub-Category Id');
        }

        this.id = subCategory.id
        this.name = subCategory.name
        this.categoryId = subCategory.categoryId
    }
    
    toString() {
        return "SubCategory [id=" + this.id + ", name=" + this.name +", categoryId= " + this.categoryId +"]";
    }
}

module.exports = SubCategory