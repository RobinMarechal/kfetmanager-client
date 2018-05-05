export function upperFirstLetter(string) {
    return string.split(' ')
        .map((part) => part[0].toUpperCase() + part.substring(1))
        .join(' ');
}

export function isEmpty(obj) {
    if (obj.length > 0) return false;
    if (obj.length === 0) return true;

    return Object.keys(obj).length === 0;
}
