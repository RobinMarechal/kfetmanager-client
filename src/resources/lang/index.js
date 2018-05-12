import loadEnglish from './en';
import loadFrench from './fr';
import { TRANSLATIONS } from './translations';
import Config from '../../libs/Config';
import { capitalize, upperFirstLetter } from '../../libs/helpers';
import { DateTimeFormatter } from 'js-joda';


loadEnglish();
loadFrench();

export default function lang(key, ...formatters) {
    let t = TRANSLATIONS[Config.get('app.lang')][key];

    for (let formatter of formatters) {
        t = formatter(t);
    }

    return t;
}

export function langUpperFirstLetter(key) {
    return upperFirstLetter(lang(key));
}

export function langCapitalize(key) {
    return capitalize(lang(key));
}

export function langDecimalSeparator() {
    const lang = Config.get('app.lang');
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
    const lang = Config.get('app.lang');
    switch (lang) {
        case 'en':
            return ',';
        case 'fr':
            return ' ';
        default:
            return ','
    }
}

export function langFormatDate(date, format){
    return date.format(DateTimeFormatter.ofPattern(format));
}

export {TRANSLATIONS};