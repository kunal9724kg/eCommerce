class Product {
    constructor(product) {
        if(product === undefined){
            throw new Error('Send Product Details');
        }
        if(product.id === undefined){
            throw new Error('Send Product Id');
        }
        
        this.id = product.id;
        this.name = product.name;
        this.price = product.price;
        this.stockLeft = product.stockLeft;
        this.subCategoryId = product.subCategoryId;
        this.categoryId = product.categoryId;
    }
    
    toString() {
        return "Product [id=" + this.id + ", name=" + this.name +", categoryId= " + this.categoryId +"]";
    }

    static getProductConverter() {
        return {
            toFirestore: this.toFirestore,
            fromFirestore: this.fromFirestore
        }
    }

    static toFirestore(product) {
        return {
            id: product.id,
            name: product.name,
            price: product.price,
            stockLeft: product.stockLeft,
            subCategoryId: product.subCategoryId,
            categoryId: product.categoryId
        }
    }

    static fromFirestore(snapshot) {
        const product= snapshot.data();
        return new Product(product)
    }
}

module.exports = Product