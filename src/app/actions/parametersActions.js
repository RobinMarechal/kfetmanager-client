export const UPDATE_PARAMETERS = 'UPDATE_PARAMETERS';

export function updateParameters(parameters) {
    return {
        type: UPDATE_PARAMETERS,
        payload: { parameters },
    };
}