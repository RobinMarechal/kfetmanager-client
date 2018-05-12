export const FETCH_CATEGORY_BEGIN = 'FETCH_CATEGORY_BEGIN';
export const FETCH_CATEGORY_SUCCESS = 'FETCH_CATEGORY_SUCCESS';
export const FETCH_CATEGORY_FAILURE = 'FETCH_CATEGORY_FAILURE';

// Fetch actions

export function fetchCategoryBegin() {
    return {
        type: FETCH_CATEGORY_BEGIN,
    };
};

export function fetchCategorySuccess(categories) {
    return {
        type: FETCH_CATEGORY_SUCCESS,
        payload: {categories},
    };
}

export function fetchCategoryError(error) {
    return {
        type: FETCH_CATEGORY_FAILURE,
        payload: {error},
    };
}

