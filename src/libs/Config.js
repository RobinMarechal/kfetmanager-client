const { REST_CONFIG } = require('laravel-rest-api-query-builder');

/**
 * Singleton
 */
export default class Config {

    static instance = new Config();

    /**
     * @private
     */
    constructor() {
        if (Config.instance) {
            throw new Error("Config is a Singleton. Use 'Config.instance' to retrieve its instance");
        }

        this.config = DEFAULT;
    }

    async load() {
        const response = await fetch('./config/config.json');

        try {
            const json = await response.json();
            this.config = json;
        } catch (e) {
            this.config = DEFAULT;
        }

        this._mergeRestConfig();

        return this.config;
    }

    _mergeRestConfig() {
        REST_CONFIG.base_url = this.config.server.base_url;
    }

    all() {
        return this.config;
    }

    get(key, def) {
        try{
            let value = this.config;
            const parts = key.split('.');
            for (const p of parts) {
                value = value[p];
            }
            return value;
        }
        catch(e){
            return def;
        }
    }

    set(key, value){
        const parts = key.split('.');
        let i;
        let toUpdate = this.config;


        for (i = 0; i < parts.length - 1; i++) {
            toUpdate = toUpdate[parts[i]];
        }

        toUpdate[parts[i]] = value;

        if(key.includes('server')){
            this._mergeRestConfig();
        }
    }

    save(){

    }
}

Config.bodyHeight = '600px';

const DEFAULT = {
    "app": {
        "lang": "en",
        "products": {
            "criticalStock": 5,
        },
        "customers": {
            "criticalBalance": 8,
        },
        "serverCheckInterval": "5000",
    },
    "server": {
        "base_url": "http://localhost:8000/api",
    },
    "gui": {
        "body": {
            "height": "400px",
        },
    },
};