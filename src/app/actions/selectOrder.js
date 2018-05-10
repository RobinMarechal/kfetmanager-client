export default function selectOrder(order){
    console.log("Clicked on order", order);
    return {
        type: 'ORDER_SELECTED',
        payload: order
    }
}