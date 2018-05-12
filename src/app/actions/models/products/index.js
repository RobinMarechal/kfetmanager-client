export const PRODUCT_CLICKED = 'PRODUCT_CLICKED';

export function productClicked(product){
    return {
        type: PRODUCT_CLICKED,
        payload: product
    }
}

export {
    fetchProductBegin,
    fetchProductError,
    fetchProductSuccess,

    FETCH_PRODUCT_FAILURE,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_BEGIN
} from './fetchActions';