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
            throw new Error("Singleton");
        }

        this.config = null;
    }

    async load() {
        const response = await fetch('./config/config.json');
        if (response.status === 404) {
            this.config = DEFAULT;
        }

        const json = await response.json();
        this.config = json;

        this._mergeRestConfig();

        return this.config;
    }

    _mergeRestConfig() {
        REST_CONFIG.base_url = this.config.server.base_url;
    }

    all() {
        return this.config;
    }

    get(key) {
        let value = this.config;
        const parts = key.split('.');
        for (const p of parts) {
            value = value[p];
        }

        return value;
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
        "base_url": "https://localhost:8000/api",
    },
    "gui": {
        "body": {
            "height": "400px",
        },
    },
};