import { TRANSLATIONS } from './translations';
import { DateTimeFormatter } from 'js-joda';

export default function loadEnglish() {

    TRANSLATIONS.en = {
        newOrder: 'new order',
        ':': ': ',
        lastOrders: "last orders",
        newCustomer: 'new customer',
        anErrorOccurred: 'an error occurred',
        searchProduct: 'search for a product',
        searchCustomer: 'search for a customer',
        searchMenu: 'search for a menu',
        customerSelection: 'customer selection',
        menuSelection: 'menu selection',
        discountSelection: 'discount selection',
        productSelection: 'product selection',
        productsSelection: 'selection of products',
        allYears: 'all years',
        allDepartments: 'all departments',
        selectedCustomer: 'selected customer',
        selectedMenu: 'selected menu',
        selectedProducts: 'selected products',
        selectedDiscount: 'selected discount',

        lessThan: 'less than',
        moreThan: 'more than',

        manageProducts: 'manage products',
        manageCustomers: 'manage customers',
        manageTreasury: 'manage the treasury',

        orderHistory: 'order history',

        submitOrder: 'submit the order',

        THIRD: '3rd year',
        FOURTH: '4th year',
        FIFTH: '5th year',
        PHD: 'PhD student',
        PROFESSOR: 'professor',
        OTHER: 'other',

        orderSummary: 'summary',
        basePrice: 'base price',
        finalPrice: 'final price',

        atDate: 'at date',

        dateTimeFormat: DateTimeFormatter.ofPattern("dd-MM-yyyy 'at' HH':'mm"),
        timeFormat: DateTimeFormatter.ofPattern("HH':'mm"),
        dateTimeFormatWithSeconds: DateTimeFormatter.ofPattern("dd-MM-yyyy 'at' HH:mm:ss"),
        timeFormatWithSeconds: DateTimeFormatter.ofPattern("HH:mm:ss"),
        dateFormat: DateTimeFormatter.ofPattern("dd-MM-yyyy"),

        customDateFormat: 'd-m-Y',
        customTimeFormat: 'h:i',
        customDateTimeFormat: 'd-m-Y at h:i',
        orderHistoryDateTimeFormat: '{D} {d} {M} - {H}:{i}{pmam}',

        daysOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        shortDaysOfWeek: ['Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.', 'Sun.'],
        months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        shortMonths: ['Jan.', 'Feb.', 'Mar.', 'Apr.', 'May', 'June', 'July', 'Aug.', 'Sept.', 'Oct.', 'Nov.', 'Dec.'],

        helpOrderHistoryDateField: `If this field is filled, the 'From' and 'To' Date fields are not taken into account.`,
        helpOrderHistoryLessThan: `0 = no limit.`,
        helpOrderHistoryDateAndTime: `- If both (Date and Time) are filled, the software will filter according to the datetimes (eg: April 3rd 2018 at 16:30).\n`
        + `- If only dates are filled, the software will filter according to the dates only (eg: between 12th May and 15th of May).\n`
        + `- If only times are filled, the software will filter according to the times only (eg: between 12:30 and 14h00).`,
    };

}
