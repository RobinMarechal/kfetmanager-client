export const MENU_CLICKED = 'MENU_CLICKED';
export const MENU_PANEL_SYNC_BUTTON_CLICKED = 'MENU_PANEL_SYNC_BUTTON_CLICKED';
export const CREATE_MENU = 'CREATE_MENU'

export function menuClicked(menu) {
    return {
        type: MENU_CLICKED,
        payload: menu,
    };
}

export function menusPanelSyncButtonClicked() {
    return {
        type: MENU_PANEL_SYNC_BUTTON_CLICKED,
    };
}

export function createMenu(data){
    console.log("new menu", data);
    return {
        type: CREATE_MENU,
        payload: data
    }
}

export {
    fetchMenuBegin,
    fetchMenuError,
    fetchMenuSuccess,

    FETCH_MENU_FAILURE,
    FETCH_MENU_SUCCESS,
    FETCH_MENU_BEGIN,
} from './fetchActions';