import {langDecimalSeparator, langThousandSeparator} from '../../resources/lang';
import {UnreachableServerException, InvalidUrlException} from 'bunch-of-exceptions';

export function upperFirstLetter(string) {
    return string.split(' ')
        .map((part) => part[0].toUpperCase() + part.substring(1))
        .join(' ');
}

export function capitalize(string) {
    return string.split(' ')
        .map((word) => upperFirstLetter(word))
        .join(' ');
}

export function isEmpty(obj) {
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    return Object.keys(obj).length === 0;
}

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

        if (groupSize == 3) {
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

export async function awaitOrEmpty(toAwait){
    try{
        return await toAwait;
    }
    catch(e){
        return [];
    }
}