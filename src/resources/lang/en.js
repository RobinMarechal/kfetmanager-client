import { TRANSLATIONS } from './translations';
import { DateTimeFormatter } from 'js-joda';

export default function loadEnglish() {

    TRANSLATIONS.en = {
        newOrder: 'new order',
        online: 'online',
        offline: 'offline',
        search: 'search',
        ':': ': ',
        treasury: 'treasury',
        server: 'server',
        home: 'home',
        about: 'about',
        lastOrders: "last orders",
        customer: 'customer',
        newCustomer: 'new customer',
        product: 'product',
        anErrorOccurred: 'an error occurred',
        refresh: 'refresh',
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

        price: 'price',

        manageProducts: 'manage products',
        manageCustomers: 'manage customers',
        manageTreasury: 'manage the treasury',

        orderHistory: 'order history',

        submitOrder: 'submit the order',

        PEIP: 'PEIP',
        THIRD: '3rd year',
        FOURTH: '4th year',
        FIFTH: '5th year',
        PHD: 'PhD student',
        PROFESSOR: 'professor',
        OTHER: 'other',

        orderSummary: 'summary',
        menu: 'menu',
        products: 'products',
        basePrice: 'base price',
        discount: 'discount',
        finalPrice: 'final price',

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
    };

}
