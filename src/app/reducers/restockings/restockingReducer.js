import { FETCH_RESTOCKING_BEGIN, FETCH_RESTOCKING_FAILURE, FETCH_RESTOCKING_SUCCESS } from '../../actions/models/restockings';

const initialState = {
    items: [],
    error: false,
    loading: false
}


export default function restockingReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_RESTOCKING_BEGIN:
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_RESTOCKING_SUCCESS:
            return {
                ...state,
                loading: false,
                items: action.payload.restockings,
            };

        case FETCH_RESTOCKING_FAILURE:
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
            };

        default:
            return state;
    }
}