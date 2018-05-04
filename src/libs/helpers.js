export function loadStringMethods() {
    String.prototype.upperFirstLetters = function () {
        return this.split(' ')
            .map((part) => part[0].toUpperCase() + part.substring(1))
            .join(' ');
    };
}

export function loadObjectMethods(){
}


export function isEmpty (obj){
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;

    return Object.keys(obj).length === 0;
}