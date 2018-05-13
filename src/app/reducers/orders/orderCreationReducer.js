import { CUSTOMER_CLICKED } from '../../actions/models/customers/index';
import { MENU_CLICKED } from '../../actions/models/menus';
import { PRODUCT_CLICKED } from '../../actions/models/products';
import { ORDER_CREATION_DISCOUNT_SUBMITTED } from '../../actions/models/orders';

const initialState = {
    customer: {},
    menu: {},
    products: [],
    discount: 0,
};

export default function orderCreationReducer(state = initialState, action) {
    switch (action.type) {
        case CUSTOMER_CLICKED:
            // If it was already selected: deselect, select it otherwise
            return {
                ...state,
                customer: state.customer.id === action.payload.id ? {} : action.payload
            }


        case MENU_CLICKED:
            // If it was already selected: deselect, select it otherwise
            return {
                ...state,
                menu: state.menu.id === action.payload.id ? {} : action.payload
            }

        case PRODUCT_CLICKED:

            // toggle products
            const products = state.products;
            const productClicked = action.payload;
            const ids = products.map(({id}) => id);
            const index = ids.indexOf(productClicked.id);
            if(index >= 0){
                products.splice(index, 1);
            }
            else {
                products.push(productClicked);
            }

            return {
                ...state,
                products
            }

        case ORDER_CREATION_DISCOUNT_SUBMITTED:
            return {
                ...state,
                discount: action.payload,
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}

