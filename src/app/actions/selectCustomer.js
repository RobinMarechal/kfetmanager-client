export default function selectCustomer(customer){
    console.log("Clicked on customer", customer);
    return {
        type: 'CUSTOMER_SELECTED',
        payload: customer
    }
}