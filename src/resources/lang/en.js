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
    };

}
