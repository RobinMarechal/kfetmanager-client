export const CATEGORY_CLICKED = 'CATEGORY_CLICKED';
export const CATEGORY_PANEL_SYNC_BUTTON_CLICKED = 'CATEGORY_PANEL_SYNC_BUTTON_CLICKED';
export const CREATE_CATEGORY = 'CREATE_CATEGORY'

export function categoryClicked(category) {
    return {
        type: CATEGORY_CLICKED,
        payload: category,
    };
}

export function categoriesPanelSyncButtonClicked() {
    return {
        type: CATEGORY_PANEL_SYNC_BUTTON_CLICKED,
    };
}

export function createCategory(data){
    console.log("new category", data);
    return {
        type: CREATE_CATEGORY,
        payload: data
    }
}

export {
    fetchCategoryBegin,
    fetchCategoryError,
    fetchCategoriesuccess,

    FETCH_CATEGORY_FAILURE,
    FETCH_CATEGORY_SUCCESS,
    FETCH_CATEGORY_BEGIN,
} from './fetchActions';