import { arrayPushOrRemove } from './helpers';

export default class KeyMap {
    constructor() {
        this.keys = [];
    }

    toggleKey(key) {
        arrayPushOrRemove(this.keys, key);
        return this;
    }

    isPressed(key) {
        this.keys.includes(key);
    }
}

KeyMap.CONTROL = 'Control';
KeyMap.ALT = 'Alt';
KeyMap.ALT_GR = 'AltGraph';
KeyMap.META = 'Meta';
KeyMap.ENTER = 'Enter';
KeyMap.BACKSPACE = 'Backspace';
KeyMap.DELETE = 'Delete';
KeyMap.SHIFT = 'Shift';
KeyMap.TAB = 'Tab';
KeyMap.CAPSLOCK = 'CapsLock';
KeyMap.ESCPACE = 'Escape';

KeyMap.ARROW_DOWN = 'ArrowDown';
KeyMap.ARROW_RIGHT = 'ArrowRight';
KeyMap.ARROW_LEFT = 'ArrowLeft';
KeyMap.ARROW_UP = 'ArrowUp';