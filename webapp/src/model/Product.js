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
}

module.exports = Product