import { arrayPushOrRemove, arraysEqual, capitalize, formatNumber, isEmpty, stringPlural, upperFirstLetter } from '../../libs/helpers';
import Config from '../../libs/Config';

describe("upperFirstLetter", () => {
    it("should change nothing", () => {
        const str = "Azert";
        expect(upperFirstLetter(str)).toBe(str);
        expect(upperFirstLetter(" ")).toBe(" ");
        expect(upperFirstLetter("1")).toBe("1");
    });

    it("should change a into A", () => {
        expect(upperFirstLetter("azert")).toBe("Azert");
    });

    it("should not crash if only one letter", () => {
        expect(upperFirstLetter("a")).toBe("A");
    });

    it("should do nothing if empty string", () => {
        expect(upperFirstLetter("")).toBe("");
    });

    it("should throw TypeError", () => {
        expect(() => upperFirstLetter(1)).toThrowError();
    });
});

describe("capitalize", () => {
    it("should not change anything", () => {
        expect(capitalize("Two Words")).toBe("Two Words");
    });

    it("should do nothing", () => {
        expect(capitalize("")).toBe("");
        expect(capitalize(" ")).toBe(" ");
        expect(capitalize("1, 2")).toBe("1, 2");
    });

    it("should upper all first letter", () => {
        expect(capitalize("two words, again!")).toBe("Two Words, Again!");
    });

    it("should not crash if only one word or letter", () => {
        expect(capitalize("a")).toBe("A");
        expect(capitalize("word")).toBe("Word");
    });

    it("should do nothing if empty string", () => {
        expect(capitalize("")).toBe("");
    });

    it("should throw TypeError", () => {
        expect(() => capitalize(1)).toThrowError();
    });
});

describe("isEmpty", () => {
    it("should be true", () => {
        expect(isEmpty({})).toBeTruthy();
        expect(isEmpty([])).toBeTruthy();
        expect(isEmpty("")).toBeTruthy();
    });

    it("should be false", () => {
        expect(isEmpty({ a: 5 })).toBeFalsy();
        expect(isEmpty([1, 2, 3])).toBeFalsy();
        expect(isEmpty("zerty")).toBeFalsy();
    });

    it("should throw error", () => {
        expect(() => isEmpty()).toThrowError();
        expect(() => isEmpty(null)).toThrowError();
    });
});

describe("formatNumber", () => {
    Config.instance.config = { app: { lang: "en" } };

    it("should be formatted to english format", () => {
        Config.instance.config = { app: { lang: "en" } };

        expect(formatNumber(0)).toBe("0.00");
        expect(formatNumber(50.0)).toBe("50.00");
        expect(formatNumber(50000)).toBe("50,000.00");
    });

    it("should be formatted to english format", () => {
        Config.instance.config = { app: { lang: "fr" } };

        expect(formatNumber(5)).toBe("5,00");
        expect(formatNumber(50000)).toBe("50 000,00");
    });

    it("should be possible to change number of decimals", () => {
        Config.instance.config = { app: { lang: "en" } };

        expect(formatNumber(50000, 3)).toBe("50,000.000");
        expect(formatNumber(50000, 0)).toBe("50,000");
    });
});

describe("stringPlural", () => {
    it("should change nothing", () => {
        expect(stringPlural("days")).toBe("days");
        expect(stringPlural("menus")).toBe("menus");
    });

    it("should add an extra s", () => {
        expect(stringPlural("day")).toBe("days");
        expect(stringPlural("menu")).toBe("menus");
    });

    it("should transform into complex plural form", () => {
        expect(stringPlural("category")).toBe("categories");
        expect(stringPlural("process")).toBe("processes");
    });
});

describe('arrayPushOrRemove', () => {
    let arr = [];

    it("should push", () => {
        arr = arrayPushOrRemove(arr, { id: 0 });
        expect(arr).toEqual([{ id: 0 }]);

        arr = arrayPushOrRemove(arr, { id: 2 });
        expect(arr).toEqual([{ id: 0 }, { id: 2 }]);

        arr = arrayPushOrRemove(arr, { id: 1 });
        expect(arr).toEqual([{ id: 0 }, { id: 2 }, { id: 1 }]);
    });

    it("should remove", () => {
        arr = arrayPushOrRemove(arr, { id: 0 });
        expect(arr).toEqual([{ id: 2 }, { id: 1 }]);
    });
});

describe("arrayEquals", () => {
    it('should be equals', () => {
        expect(arraysEqual([], [])).toBeTruthy();
        expect(arraysEqual([1, 2, 3], [1, 2, 3])).toBeTruthy();
        expect(arraysEqual("123", "123")).toBeTruthy();
        expect(arraysEqual()).toBeTruthy();
    });

    it("should not be equals", () => {
        expect(arraysEqual(5, [5])).toBeFalsy();
        expect(arraysEqual([1, 2], [1, 3])).toBeFalsy();
        expect(arraysEqual("123", "145")).toBeFalsy();
    });
});