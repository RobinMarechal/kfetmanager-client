import { CUSTOMER_CLICKED } from '../../actions/models/customers/index';
import { MENU_CLICKED } from '../../actions/models/menus';
import { PRODUCT_CLICKED } from '../../actions/models/products';
import { DISCOUNT_CHANGED } from '../../actions/models/orders';
import { arrayPushOrRemove } from '../../../libs/helpers';

const initialState = {
    customer: {},
    menu: {},
    products: [],
    discount: '',
};

export default function orderCreationReducer(state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_CLICKED:
            // If it was already selected: deselect, select it otherwise
            return {
                ...state,
                customer: state.customer.id === action.payload.id ? {} : action.payload,
            };


        case MENU_CLICKED:
            if (state.menu.id !== action.payload.id) {
                state.products = [];
            }

            return {
                ...state,
                // If it was already selected: deselect, select it otherwise
                menu: state.menu.id === action.payload.id ? {} : action.payload,
            };

        case PRODUCT_CLICKED:
            return {
                ...state,
                products: arrayPushOrRemove(state.products, action.payload),
            };

        case DISCOUNT_CHANGED:
            return {
                ...state,
                discount: action.payload,
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}

