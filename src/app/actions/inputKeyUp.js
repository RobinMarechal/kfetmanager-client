export const ENTER_PRESSED = 'ENTER_PRESSED';

export function inputKeyUp(event) {
    console.log('action', event);
    if (event.key === 'Enter') {
        return {
            type: ENTER_PRESSED,
        };
    }
}