import loadEnglish from './en';
import loadFrench from './fr';
import {TRANSLATIONS} from './translations';
import Config from '../../app/libs/Config';
import {upperFirstLetter, capitalize} from '../../app/libs/helpers';
import {DateTimeFormatter} from 'js-joda';


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
    }
}

export function langThousandSeparator() {
    const lang = Config.get('app.lang');
    switch (lang) {
        case 'en':
            return ',';
        case 'fr':
            return ' ';
    }
}

export function langFormatDate(date, format){
    return date.format(DateTimeFormatter.ofPattern(format));
}

export {TRANSLATIONS};