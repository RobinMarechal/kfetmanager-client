import { CREATE_CATEGORY, FETCH_CATEGORY_BEGIN, FETCH_CATEGORY_FAILURE, FETCH_CATEGORY_SUCCESS } from '../actions/models/categories';
import { MAX_ITEMS_PER_PANEL } from '../controllers/Home/Home';

const initialState = {
    items: [],
    loading: false,
    error: null,
};

export default function categoriesReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_CATEGORY_BEGIN:
            // Mark the state as "loading" so we can show a spinner or something
            // Also, reset any errors. We're starting fresh.
            return {
                ...state,
                loading: true,
                error: null,
            };

        case FETCH_CATEGORY_SUCCESS:
            // All done: set loading "false".
            // Also, replace the items with the ones from the server
            return {
                ...state,
                loading: false,
                items: action.payload.categories,
            };

        case FETCH_CATEGORY_FAILURE:
            // The request failed, but it did stop, so set loading to "false".
            // Save the error, and we can display it somewhere
            // Since it failed, we don't have items to display anymore, so set it empty.
            // This is up to you and your app though: maybe you want to keep the items
            // around! Do whatever seems right.
            return {
                ...state,
                loading: false,
                error: action.payload.error,
                items: [],
            };

        case CREATE_CATEGORY:
            console.log(state, action);
            // state.items.splice(0, 0);
            state.items = state.items.slice(0, MAX_ITEMS_PER_PANEL)
            return {
                ...state,
                loading: false,
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}

