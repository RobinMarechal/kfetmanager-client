export const FETCH_RESTOCKING_BEGIN = 'FETCH_RESTOCKING_BEGIN';
export const FETCH_RESTOCKING_SUCCESS = 'FETCH_RESTOCKING_SUCCESS';
export const FETCH_RESTOCKING_FAILURE = 'FETCH_RESTOCKING_FAILURE';

// Fetch actions

export function fetchRestockingBegin() {
    return {
        type: FETCH_RESTOCKING_BEGIN,
    };
};

export function fetchRestockingSuccess(restockings) {
    return {
        type: FETCH_RESTOCKING_SUCCESS,
        payload: {restockings},
    };
}

export function fetchRestockingError(error) {
    return {
        type: FETCH_RESTOCKING_FAILURE,
        payload: {error},
    };
}

