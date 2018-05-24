import { KEY_DOWN, KEY_UP } from '../actions/keyMapActions';
import KeyMap from '../../libs/KeyMap';

const initialState = {
    keys: new KeyMap(),
};

export default function keyMapReducer(state = initialState, action) {
    switch (action.type) {

        case KEY_DOWN || KEY_UP:
            return {
                ...state,
                keys: state.keys.toggleKey(action.payload.key),
            };

        default:
            return state;
    }
}