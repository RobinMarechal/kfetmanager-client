import { app } from '../config/app';
import { gui } from '../config/gui';

export default class Config {

    static load() {
        Config.set('app', app);
        Config.set('gui', gui);
    }

    static set(key, json) {
        Config[key] = json;
    }

    static get(key) {
        const arr = key.split('.');
        let res = Config[arr[0]];

        for (let i = 1; i < arr.length; i++) {
            res = res[arr[i]];
        }

        return res;
    }
}

Config.bodyHeight = '600px';