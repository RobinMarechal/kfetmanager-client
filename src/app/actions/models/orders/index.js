export const ORDER_CLICKED = 'ORDER_CLICKED';
export const ORDER_PANEL_SYNC_BUTTON_CLICKED = 'ORDER_PANEL_SYNC_BUTTON_CLICKED';
export const CREATE_ORDER = 'CREATE_ORDER';
export const DISCOUNT_CHANGED = 'DISCOUNT_CHANGED';
export const ORDER_VALIDATED = 'ORDER_VALIDATED';

export function orderClicked(order) {
    return {
        type: ORDER_CLICKED,
        payload: order,
    };
}

export function ordersPanelSyncButtonClicked() {
    return {
        type: ORDER_PANEL_SYNC_BUTTON_CLICKED,
    };
}

export function createOrder(data) {
    return {
        type: CREATE_ORDER,
        payload: data,
    };
}

export function discountChanged(discount) {
    return {
        type: DISCOUNT_CHANGED,
        payload: discount,
    };
}

export function orderValidated(boolean = true) {
    return {
        type: ORDER_VALIDATED,
        payload: boolean,
    };
}

export {
    fetchOrderBegin,
    fetchOrderError,
    fetchOrderSuccess,

    FETCH_ORDER_FAILURE,
    FETCH_ORDER_SUCCESS,
    FETCH_ORDER_BEGIN,
} from './fetchActions';