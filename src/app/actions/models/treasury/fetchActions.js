export const FETCH_TREASURY_BEGIN = 'FETCH_TREASURY_BEGIN';
export const FETCH_TREASURY_SUCCESS = 'FETCH_TREASURY_SUCCESS';
export const FETCH_TREASURY_FAILURE = 'FETCH_TREASURY_FAILURE';

// Fetch actions

export function fetchTreasuryBegin() {
    return {
        type: FETCH_TREASURY_BEGIN,
    };
};

export function fetchTreasurySuccess(treasury) {
    return {
        type: FETCH_TREASURY_SUCCESS,
        payload: {treasury},
    };
}

export function fetchTreasuryError(error = true) {
    return {
        type: FETCH_TREASURY_FAILURE,
        payload: {error},
    };
}

