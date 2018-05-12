export const FETCH_CUSTOMER_BEGIN = 'FETCH_CUSTOMER_BEGIN';
export const FETCH_CUSTOMER_SUCCESS = 'FETCH_CUSTOMER_SUCCESS';
export const FETCH_CUSTOMER_FAILURE = 'FETCH_CUSTOMER_FAILURE';

// Fetch actions

export function fetchCustomerBegin() {
    return {
        type: FETCH_CUSTOMER_BEGIN,
    };
};

export function fetchCustomerSuccess(customers) {
    return {
        type: FETCH_CUSTOMER_SUCCESS,
        payload: {customers},
    };
}

export function fetchCustomerError(error) {
    return {
        type: FETCH_CUSTOMER_FAILURE,
        payload: {error},
    };
}

