import { TRANSLATIONS } from './translations';
import { DateTimeFormatter } from 'js-joda';

export default function loadFrench() {

    TRANSLATIONS.fr = {
        newOrder: 'nouvelle commande',
        online: 'en ligne',
        offline: 'hors ligne',
        search: 'rechercher',
        ':': ' : ',
        treasury: 'trésorerie',
        server: 'serveur',
        home: 'accueil',
        about: 'à propos',
        lastOrders: "dernières commandes",
        customer: 'client',
        newCustomer: 'nouveau client',
        product: 'produit',
        anErrorOccurred: 'une erreur est survenue',
        refresh: 'rafraîchir',
        searchProduct: 'rechercher un produit',
        searchCustomer: 'rechercher un client',
        searchMenu: 'rechercher un menu',
        customerSelection: 'sélection du client',
        menuSelection: 'sélection du menu',
        discountSelection: 'sélection de la réduction',
        productSelection: 'sélection du produit',
        productsSelection: 'sélection des produits',
        allYears: 'toutes les années',
        allDepartments: 'tous les départements',
        selectedCustomer: 'client sélectionné',
        selectedMenu: 'menu sélectionné',
        selectedProducts: 'produits sélectionnés',
        selectedDiscount: 'réduction sélectionnée',

        price: 'prix',

        manageProducts: 'gérer les produits',
        manageCustomers: 'gérer les clients',
        manageTreasury: 'gérer la trésorerie',

        orderHistory: 'historique des commandes',

        submitOrder: 'valider la commande',

        PEIP: 'PEIP',
        THIRD: '3A',
        FOURTH: '4A',
        FIFTH: '5A',
        PHD: 'doctorant',
        PROFESSOR: 'professeur',
        OTHER: 'autre',

        orderSummary: 'récapitulatif',
        menu: 'menu',
        products: 'produits',
        basePrice: 'prix de base',
        discount: 'réduction',
        finalPrice: 'prix final',

        dateTimeFormat: DateTimeFormatter.ofPattern("dd/MM/yyyy 'à' HH'h'mm"),
        timeFormat: DateTimeFormatter.ofPattern("HH'h'mm"),
        dateTimeFormatWithSeconds: DateTimeFormatter.ofPattern("dd/MM/yyyy 'à' HH':'mm':'ss"),
        timeFormatWithSeconds: DateTimeFormatter.ofPattern("HH':'mm':'ss"),
        dateFormat: DateTimeFormatter.ofPattern("dd/MM/yyyy"),

        customDateFormat: '{d}/{m}/{Y}',
        customTimeFormat: '{H}:{i}',
        customDatetimeFormat: '{d}/{m}/{Y} à {H}:{i}',
        orderHistoryDateTimeFormat: '{D} {d} {M} - {HH}:{i}',

        daysOfWeek: ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'],
        shortDaysOfWeek: ['Lun.', 'Mar.', 'Mer.', 'Jeu.', 'Ven.', 'Sam.', 'Dim.'],
        months: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
        shortMonths: ['Jan.', 'Fév.', 'Mars', 'Avr.', 'Mai', 'Juin', 'Juil.', 'Août', 'Sep.', 'Oct.', 'Nov.', 'Déc.'],
    };

}
