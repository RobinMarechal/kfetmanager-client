import { MENU_CLICKED } from '../../actions/models/menus/index';

const initialState = {};

export default function selectedMenuReducer(state = initialState, action) {
    switch (action.type) {
        case MENU_CLICKED:
            // If he was already selected: deselect, select him otherwise
            return state.id === action.payload.id ? {} : action.payload;

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}

