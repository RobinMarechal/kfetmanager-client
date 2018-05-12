import { FETCH_TREASURY_BEGIN, FETCH_TREASURY_FAILURE, FETCH_TREASURY_SUCCESS } from '../actions/models/treasury';

const initialState = {
    treasury: null,
    loading: false,
    error: null,
};

export default function treasuryReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_TREASURY_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_TREASURY_SUCCESS:
            return {
                treasury: action.payload.treasury,
                loading: false,
                error: null,
            };

        case FETCH_TREASURY_FAILURE:
            return {
                loading: false,
                error: action.payload.error,
                treasury: [],
            };

        default:
            return state;
    }
}