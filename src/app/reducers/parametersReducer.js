import { UPDATE_PARAMETERS } from '../actions/parametersActions';
import Config from '../../libs/Config';
import { REST_CONFIG } from 'laravel-rest-api-query-builder';

export default function parametersReducer(state = Config.instance.all(), action) {
    switch (action.type) {
        case UPDATE_PARAMETERS:
            REST_CONFIG.base_url = state.server.base_url;
            return action.payload.parameters;

        default:
            return state;
    }
}