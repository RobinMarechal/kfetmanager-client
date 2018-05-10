export default function selectProduct(product){
    console.log("Clicked on product", product);
    return {
        type: 'PRODUCT_SELECTED',
        payload: product
    }
}