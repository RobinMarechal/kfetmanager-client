import loadEnglish from './en';
import loadFrench from './fr';
import { TRANSLATIONS } from './translations';
import Config from '../../libs/Config';
import { capitalize, upperFirstLetter } from '../../libs/helpers';


loadEnglish();
loadFrench();

export default function lang(key, ...formatters) {
    let t = TRANSLATIONS[Config.instance.get('app.lang')][key];

    if (!t) {
        t = key;
    }

    for (let formatter of formatters) {
        t = formatter(t);
    }

    return t;
}

export function langUpperFirstLetter(key) {
    return upperFirstLetter(lang(key));
}

export function langDecimalSeparator() {
    const lang = Config.instance.get('app.lang');
    switch (lang) {
        case 'en':
            return '.';
        case 'fr':
            return ',';
        default:
            return '.';
    }
}

export function langThousandSeparator() {
    const lang = Config.instance.get('app.lang');
    switch (lang) {
        case 'en':
            return ',';
        case 'fr':
            return ' ';
        default:
            return ',';
    }
}

export { TRANSLATIONS };