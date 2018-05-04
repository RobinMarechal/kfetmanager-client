import {app} from '../config/app';

export default class Config {

    static load(){
        Config.set('app', app);
    }

    static set(key, json){
        Config[key] = json;
    }

    static get(key){
        const arr = key.split('.');
        let res = Config[arr[0]];

        for (let i = 1; i < arr.length; i++){
            res = res[arr[i]];
        }

        return res;
    }
}