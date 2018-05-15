import { langDecimalSeparator, langThousandSeparator } from '../resources/lang/index';

/**
 *
 * @param {string} string
 * @returns {string}
 */
export function upperFirstLetter(string) {
    return string[0].toUpperCase() + string.substring(1)
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
export function capitalize(string) {
    return string.split(' ')
        .map((word) => upperFirstLetter(word))
        .join(' ');
}

/**
 *
 * @param {object} obj
 * @returns {boolean}
 */
export function isEmpty(obj) {
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    return Object.keys(obj).length === 0;
}

/**
 *
 * @param {string|number} price
 * @param {Number} digits
 * @returns {string}
 */
export function formatNumber(price, digits) {
    let string = price + '';
    if (!string.includes('.'))
        string += '.0';

    let [beforeDot, afterDot] = string.split('.');
    const sign = beforeDot[0] === '-' ? '-' : '';
    if(sign === '-'){
        beforeDot = beforeDot.substr(1);
    }

    const thousandSep = langThousandSeparator();
    const decimalSep = langDecimalSeparator();

    let formattedBeforeDot = '';
    let formattedAfterDot = '';


    // before dot
    let i = beforeDot.length - 1;
    let groupSize = 0;
    while (i >= 0) {
        formattedBeforeDot = beforeDot[i] + formattedBeforeDot;
        i--;
        groupSize++;

        if (groupSize === 3) {
            groupSize = 0;
            formattedBeforeDot = thousandSep + formattedBeforeDot;
        }
    }

    if(formattedBeforeDot[0] === thousandSep){
        formattedBeforeDot = formattedBeforeDot.substr(1);
    }

    // after dot
    for (i = 0; i < digits; i++) {
        formattedAfterDot += afterDot[i] ? afterDot[i] : '0';
    }

    // result
    let result = formattedBeforeDot;
    if(digits > 0){
        result += decimalSep + formattedAfterDot;
    }

    return sign + result;
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
export function stringPlural(string){
    const last = string[string.length - 1];
    const secondLast = string[string.length - 2];

    if(last === 's' && secondLast !== 's'){
        if(secondLast === 'i'){
            return string.substring(0, string.length - 3) + 'es';
        }

        return string;
    }

    const base = string.substr(0, string.length - 2);

    if(last === 'y'){
        return base + 'ies';
    }

    if(last === 's')
        return string + 'es';

    return string + 's';
}

/**
 *
 * @param {Promise<*>} toAwait
 * @returns {Promise<*>}
 */
export async function awaitOrEmpty(toAwait){
    try{
        return await toAwait;
    }
    catch(e){
        return [];
    }
}

/**
 * add an item to an array, or remove it if already in
 * @param {array} array target array. /!\ the items in array need to have an 'id' attribute
 * @param item the item to add into the array. /!\ the item need to have an 'id' attribute
 * @returns {array}
 */
export function arrayPushOrRemove(array, item){
    const ids = array.map(({id}) => id);
    const index = ids.indexOf(item.id);

    if(index >= 0){
        array.splice(index, 1);
    }
    else {
        array.push(item);
    }

    return array;
}