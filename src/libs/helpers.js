import { langDecimalSeparator, langThousandSeparator } from '../resources/lang/index';
import lang from '../resources/lang';
import _ from 'lodash';

/**
 * @param {string} string
 * @returns {string}
 */
export function notfixed__upperFirstLetter(string) {
    return string[0].toUpperCase() + string.substring(1);
}

/**
 * @param {string} string
 * @returns {string}
 */
export function upperFirstLetter(string){
    if(string === ""){
        return "";
    }

    const firstChar = string[0].toUpperCase();

    if(string.length === 1){
        return firstChar;
    }

    return firstChar + string.substring(1);
}

/**
 * Upper the first letter of every word in the sentence
 * @param {string} string
 * @returns {string}
 */
export function capitalize(string) {
    return string.split(' ')
                 .map((word) => upperFirstLetter(word))
                 .join(' ');
}

/**
 * Test if an object, array or string is empty
 * @param {object|array|string} obj
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
export function formatNumber(price, digits = 2) {
    let string = price + '';
    if (!string.includes('.'))
        string += '.0';

    let [beforeDot, afterDot] = string.split('.');
    const sign = beforeDot[0] === '-' ? '-' : '';
    if (sign === '-') {
        beforeDot = beforeDot.substr(1);
    }

    if (beforeDot === '') {
        beforeDot = '0';
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

    if (formattedBeforeDot[0] === thousandSep) {
        formattedBeforeDot = formattedBeforeDot.substr(1);
    }

    // after dot
    for (i = 0; i < digits; i++) {
        formattedAfterDot += afterDot[i] ? afterDot[i] : '0';
    }

    // result
    let result = formattedBeforeDot;
    if (digits > 0) {
        result += decimalSep + formattedAfterDot;
    }

    return sign + result;
}

export function isConsonant(char) {
    const consonants = "zrtpqsdfghjklmwxcvbn";
    return consonants.includes(char);
}

export function isVowel(char) {
    const vowels = "aeyuio";
    return vowels.includes(char);
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
export function stringPlural(string) {
    const last = string[string.length - 1];
    const secondLast = string[string.length - 2];

    if (last === 's' && secondLast !== 's') {
        if (secondLast === 'i') {
            return string.substring(0, string.length - 3) + 'es';
        }

        return string;
    }

    const base = string.substr(0, string.length - 1);

    if (last === 'y' && isConsonant(secondLast)) {
        return base + 'ies';
    }
    else if (last === 'y' && isVowel(secondLast)) {
        return string + 's';
    }


    if (last === 's')
        return string + 'es';

    return string + 's';
}

/**
 *
 * @param {string} string
 * @returns {string}
 */
export function unfixed__stringPlural(string) {
    const last = string[string.length - 1];
    const secondLast = string[string.length - 2];

    if (last === 's' && secondLast !== 's') {
        if (secondLast === 'i') {
            return string.substring(0, string.length - 3) + 'es';
        }

        return string;
    }

    const base = string.substr(0, string.length - 2);

    if (last === 'y') {
        return base + 'ies';
    }

    if (last === 's')
        return string + 'es';

    return string + 's';
}

/**
 *
 * @param {Promise<*>} toAwait
 * @returns {Promise<*>}
 */
export async function awaitOrEmpty(toAwait) {
    try {
        return await toAwait;
    }
    catch (e) {
        return [];
    }
}

/**
 * add an item to an array, or remove it if already in
 * @param {array} array target array. /!\ the items in array need to have an 'id' attribute
 * @param item the item to add into the array. /!\ the item need to have an 'id' attribute
 * @returns {array}
 */
export function arrayPushOrRemove(array, item) {
    const ids = array.map(({ id }) => id);
    const index = ids.indexOf(item.id);

    if (index >= 0) {
        array.splice(index, 1);
    }
    else {
        array.push(item);
    }

    return array;
}


export function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;

    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
};


/**
 *
 * @param {LocalDate|LocalDateTime|LocalTime} date
 * @param {string} format. Each format value must be rounded by {}. Ex: {d}-{m}-{Y}
 *     Formats: <br/>
 *     - d: day of week number (2 digits)
 *     - D: short day of week name (eg mon., tue. ...)
 *     - DD: long day of week name (eg monday, tuesday)
 *     - m: month number (2 digits, from 1 to 12)
 *     - M: short month name (eg jan., feb. ...)
 *     - MM: long month name (eg january, february ...)
 *     - Y: year (eg 2018)
 *     - H: hour (2 digits, modulo 12)
 *     - HH: hour (2 digits, modulo 24)
 *     - i: minutes (2 digits)
 *     - s: seconds (2 digits)
 *     - pmam: PM/AM
 *
 * @returns {string} formatted date/datetime/time
 */
export function customDateFormat(date, format) {
    const daysOfWeek = lang('daysOfWeek');
    const shortDaysOfWeek = lang('shortDaysOfWeek');
    const months = lang('months');
    const shortMonths = lang('shortMonths');

    const format2Digits = (value) => {
        return value < 10 ? "0" + value : value;
    };

    if (format.match(/\{[dDmMY]+\}/)) {
        const dayOfWeek = date.dayOfWeek().value() - 1;
        format = format.replace('{DD}', daysOfWeek[dayOfWeek]);
        format = format.replace('{D}', shortDaysOfWeek[dayOfWeek]);
        format = format.replace('{d}', format2Digits(date.dayOfMonth()));

        const month = date.monthValue() - 1;
        format = format.replace('{MM}', months[month]);
        format = format.replace('{M}', shortMonths[month]);
        format = format.replace('{m}', format2Digits(month + 1));

        format = format.replace('{Y}', date.year());
    }

    if (format.match(/\{[His]+\}/)) {
        const hour = date.hour();
        format = format.replace('{HH}', format2Digits(hour));
        format = format.replace('{H}', format2Digits(hour % 12));

        format = format.replace('{i}', format2Digits(date.minute()));
        format = format.replace('{s}', format2Digits(date.second()));

        format = format.replace('{pmam}', hour > 12 ? 'pm' : 'am');
    }

    return format;
}

export function isNumberValid(value) {
    const regexp = new RegExp(/-?[0-9]*([.,][0-9]{0,2})?%?/);
    const test = regexp.exec(value);
    return test[0] === value;
}

export function isEmailValid(email){
    if(email && email.match(/^[A-Za-z0-9\-\_\.]+@[A-Za-z0-9\-\.]+(\.[a-z]+)$/g).length > 0){
        return true;
    }
    return false;
}

export function isId(id){
    if(id && _.isNumber(id) && id > 0){
        return true;
    }

    return false;
}

export function isBoolean(bool){
    return bool === true || bool === false;
}

export function isNumber(n){
    return _.isNumber(n);
}