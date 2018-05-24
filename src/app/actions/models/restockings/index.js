export const RESTOCKING_CLICKED = 'RESTOCKING_CLICKED';

export function restockingClicked(restocking){
    return {
        type: RESTOCKING_CLICKED,
        payload: restocking
    }
}

export {
    fetchRestockingBegin,
    fetchRestockingError,
    fetchRestockingSuccess,

    FETCH_RESTOCKING_FAILURE,
    FETCH_RESTOCKING_SUCCESS,
    FETCH_RESTOCKING_BEGIN
} from './fetchActions';