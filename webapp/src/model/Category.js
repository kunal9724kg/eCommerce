class Category {
    constructor(category) {
        if(category === undefined){
            throw new Error('Send Category');
        }
        if(category.id === undefined){
            throw new Error('Send category Id');
        }
        
        this.id = category.id;
        this.name = category.name;
    }

    toJSON() {
        return {
            id: this.id,
            name: this.name
        }
    }
}

module.exports = Category;