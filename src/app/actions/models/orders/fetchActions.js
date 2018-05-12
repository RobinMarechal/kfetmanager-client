export const FETCH_ORDER_BEGIN = 'FETCH_ORDER_BEGIN';
export const FETCH_ORDER_SUCCESS = 'FETCH_ORDER_SUCCESS';
export const FETCH_ORDER_FAILURE = 'FETCH_ORDER_FAILURE';

// Fetch actions

export function fetchOrderBegin() {
    return {
        type: FETCH_ORDER_BEGIN,
    };
};

export function fetchOrderSuccess(orders) {
    return {
        type: FETCH_ORDER_SUCCESS,
        payload: {orders},
    };
}

export function fetchOrderError(error) {
    return {
        type: FETCH_ORDER_FAILURE,
        payload: {error},
    };
}

