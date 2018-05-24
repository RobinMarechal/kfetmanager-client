export const KEY_DOWN = 'KEY_DOWN';
export const KEY_UP = 'KEY_UP';

export function keyDown(key) {
    return {
        type: KEY_DOWN,
        payload: { key },
    };
}

export function keyUp(key) {
    return {
        type: KEY_UP,
        payload: { key },
    };
}
