export const SUBCATEGORY_CLICKED = 'SUBCATEGORY_CLICKED';
export const SUBCATEGORY_PANEL_SYNC_BUTTON_CLICKED = 'SUBCATEGORY_PANEL_SYNC_BUTTON_CLICKED';
export const CREATE_SUBCATEGORY = 'CREATE_SUBCATEGORY'

export function subcategoryClicked(subcategory) {
    return {
        type: SUBCATEGORY_CLICKED,
        payload: subcategory,
    };
}

export function subcategoriesPanelSyncButtonClicked() {
    return {
        type: SUBCATEGORY_PANEL_SYNC_BUTTON_CLICKED,
    };
}

export function createSubcategory(data){
    console.log("new subcategory", data);
    return {
        type: CREATE_SUBCATEGORY,
        payload: data
    }
}

export {
    fetchSubcategoryBegin,
    fetchSubcategoryError,
    fetchSubcategoriesuccess,

    FETCH_SUBCATEGORY_FAILURE,
    FETCH_SUBCATEGORY_SUCCESS,
    FETCH_SUBCATEGORY_BEGIN,
} from './fetchActions';