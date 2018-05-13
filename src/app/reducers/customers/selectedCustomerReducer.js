import { CUSTOMER_CLICKED } from '../../actions/models/customers/index';

const initialState = {};

export default function selectedCustomerReducer(state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_CLICKED:
            // If he was already selected: deselect, select him otherwise
            return state.id === action.payload.id ? {} : action.payload;

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}

