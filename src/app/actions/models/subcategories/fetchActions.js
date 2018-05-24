export const FETCH_SUBCATEGORY_BEGIN = 'FETCH_SUBCATEGORY_BEGIN';
export const FETCH_SUBCATEGORY_SUCCESS = 'FETCH_SUBCATEGORY_SUCCESS';
export const FETCH_SUBCATEGORY_FAILURE = 'FETCH_SUBCATEGORY_FAILURE';

// Fetch actions

export function fetchSubcategoryBegin() {
    return {
        type: FETCH_SUBCATEGORY_BEGIN,
    };
};

export function fetchSubcategorySuccess(subcategories) {
    return {
        type: FETCH_SUBCATEGORY_SUCCESS,
        payload: {subcategories},
    };
}

export function fetchSubcategoryError(error) {
    return {
        type: FETCH_SUBCATEGORY_FAILURE,
        payload: {error},
    };
}

