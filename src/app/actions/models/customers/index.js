export const CUSTOMER_CLICKED = 'CUSTOMER_CLICKED';
export const CUSTOMERS_PANEL_REFRESH = 'CUSTOMERS_PANEL_REFRESH';

export function customerClicked(customer){
    return {
        type: CUSTOMER_CLICKED,
        payload: customer
    }
}

export {
    fetchCustomerBegin,
    fetchCustomerError,
    fetchCustomerSuccess,

    FETCH_CUSTOMER_FAILURE,
    FETCH_CUSTOMER_SUCCESS,
    FETCH_CUSTOMER_BEGIN
} from './fetchActions';