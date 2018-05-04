import loadEnglish from './en';
import loadFrench from './fr';
import {TRANSLATIONS} from './translations';
import Config from '../../libs/Config';

loadEnglish();
loadFrench();

export default function lang(key){
    return TRANSLATIONS[Config.get('app.lang')][key];
}

export {TRANSLATIONS};