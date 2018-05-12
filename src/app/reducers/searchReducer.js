import { ENTER_PRESSED } from '../actions/inputKeyUp';

const initialState = '';

export default function searchReducer(state = initialState, action) {
    switch (action.type) {
        case ENTER_PRESSED:
            return '';
        default:
            return state;
    }
}