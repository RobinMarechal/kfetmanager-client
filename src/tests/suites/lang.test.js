import { langDecimalSeparator, langThousandSeparator, TRANSLATIONS } from '../../resources/lang';
import Config from '../../libs/Config';
import lang from '../../resources/lang';
import { stringPlural, upperFirstLetter } from '../../libs/helpers';

TRANSLATIONS.en = {
    order: "order",
};
TRANSLATIONS.fr = {
    order: "commande",
    customer: "client",
};

describe("globals", () => {
    it("should return key", () => {
        Config.instance.config = { app: { lang: "en" } };

        expect(lang(null)).toBe(null);
        expect(lang(1)).toBe(1);
        expect(lang()).toBe(undefined);
    });

    it("should throw Error", () => {
        expect(() => lang(null, upperFirstLetter)).toThrowError();
        expect(() => lang(1, upperFirstLetter)).toThrowError();
    });

    it("should return default (english) separators", () => {
        Config.instance.config = { app: { lang: "azerazr" } };
        expect(langDecimalSeparator()).toBe('.');
        expect(langThousandSeparator()).toBe(',');
    })
});

describe("lang en", () => {
    it("should load english translation", () => {
        Config.instance.config = { app: { lang: "en" } };
        expect(lang("order")).toBe("order");
    });

    it("should return key if no translation is recorded", () => {
        Config.instance.config = { app: { lang: "en" } };
        expect(lang("customer")).toBe("customer");
    });

    it("should be formatted", () => {
        Config.instance.config = { app: { lang: "en" } };
        expect(lang("order", upperFirstLetter, stringPlural)).toBe(upperFirstLetter(stringPlural("order")));
        expect(lang("customer", upperFirstLetter, stringPlural)).toBe(upperFirstLetter(stringPlural("customer")));
    });

    it("should return english separators", () => {
        Config.instance.config = { app: { lang: "en" } };
        expect(langDecimalSeparator()).toBe('.');
        expect(langThousandSeparator()).toBe(',');
    })
});

describe("lang en", () => {
    it("should load french translation", () => {
        Config.instance.config = { app: { lang: "fr" } };
        expect(lang("order")).toBe("commande");
    });

    it("should return key if no translation is recorded", () => {
        Config.instance.config = { app: { lang: "fr" } };
        expect(lang("abc")).toBe("abc");
    });

    it("should be formatted", () => {
        Config.instance.config = { app: { lang: "fr" } };
        expect(lang("order", upperFirstLetter, stringPlural)).toBe(upperFirstLetter(stringPlural("commande")));
        expect(lang("customer", upperFirstLetter, stringPlural)).toBe(upperFirstLetter(stringPlural("client")));
    });

    it("should return french separators", () => {
        Config.instance.config = { app: { lang: "fr" } };
        expect(langDecimalSeparator()).toBe(',');
        expect(langThousandSeparator()).toBe(' ');
    })
});