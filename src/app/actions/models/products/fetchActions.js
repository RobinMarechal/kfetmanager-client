export const FETCH_PRODUCT_BEGIN = 'FETCH_PRODUCT_BEGIN';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';

// Fetch actions

export function fetchProductBegin() {
    return {
        type: FETCH_PRODUCT_BEGIN,
    };
};

export function fetchProductSuccess(products) {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: {products},
    };
}

export function fetchProductError(error) {
    return {
        type: FETCH_PRODUCT_FAILURE,
        payload: {error},
    };
}

