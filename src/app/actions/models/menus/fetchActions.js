export const FETCH_MENU_BEGIN = 'FETCH_MENU_BEGIN';
export const FETCH_MENU_SUCCESS = 'FETCH_MENU_SUCCESS';
export const FETCH_MENU_FAILURE = 'FETCH_MENU_FAILURE';

// Fetch actions

export function fetchMenuBegin() {
    return {
        type: FETCH_MENU_BEGIN,
    };
};

export function fetchMenuSuccess(menus) {
    return {
        type: FETCH_MENU_SUCCESS,
        payload: {menus},
    };
}

export function fetchMenuError(error = 'fetchMenuError') {
    return {
        type: FETCH_MENU_FAILURE,
        payload: {error},
    };
}

