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
    
    toString() {
        return "Category [id=" + this.id + ", name=" + this.name + "]";
    }

    static getCategoryConverter() {
        return {
            toFirestore: this.toFirestore,
            fromFirestore: this.fromFirestore
        }
    }

    static toFirestore(category) {
        return {
            id: category.id,
            name: category.name
        }
    }

    static fromFirestore(snapshot) {
        const category = snapshot.data();
        return new Category(category);
    }
}

module.exports = Category;