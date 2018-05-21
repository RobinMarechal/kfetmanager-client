import { CUSTOMER_CLICKED } from '../../actions/models/customers/index';
import { MENU_CLICKED } from '../../actions/models/menus';
import { PRODUCT_CLICKED } from '../../actions/models/products';
import { CLEAR_ORDER_CREATION, DISCOUNT_CHANGED, ORDER_VALIDATED } from '../../actions/models/orders';
import { arrayPushOrRemove, arraysEqual } from '../../../libs/helpers';
import Category from '../../models/Category';

const initialState = {
    customer: {},
    menu: {},
    products: [],
    discount: '',
    validated: false,
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

        case ORDER_VALIDATED:
            return {
                ...state,
                validated: action.payload,
            };

        case CLEAR_ORDER_CREATION:
            return {
                customer: {},
                menu: {},
                products: [],
                discount: '',
                validated: false,
            };

        default:
            // ALWAYS have a default case in a reducer
            return state;
    }
}

export async function revalidateOrder(orderCreation, orderValidated) {
    const { menu, products, enable: wasEnabled } = orderCreation;

    if (products.length === 0) {
        return orderValidated(false);
    }

    if (!menu.id) {
        return orderValidated();
    }

    // menu, then all categories have to be filled
    const categories = await menu.lazyLoadAndGet('categories');

    if (categories.length !== products.length) {
        return orderValidated(false);
    }

    const selectedCategoriesId = [];
    const shouldBeSelectedId = categories.map(c => c.id);

    for (const p of products) {
        if (!p.category || !p.category.id) {
            p.category = await new Category().of(p).find();
        }

        selectedCategoriesId.push(p.category.id);
    }

    selectedCategoriesId.sort((a, b) => a < b);
    shouldBeSelectedId.sort((a, b) => a < b);

    if (arraysEqual(shouldBeSelectedId, selectedCategoriesId) && !wasEnabled) {
        return orderValidated(true);
    }

    return;
}

