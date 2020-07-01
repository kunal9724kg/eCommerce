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

    static getSubCategoryConverter() {
        return {
            toFirestore: this.toFirestore,
            fromFirestore: this.fromFirestore
        }
    }

    static toFirestore(subCategory) {
        return {
            id: subCategory.id,
            name: subCategory.name,
            categoryId : subCategory.categoryId
        }
    }

    static fromFirestore(snapshot) {
        const subCategory = snapshot.data();
        return new SubCategory(subCategory)
    }
}

module.exports = SubCategory