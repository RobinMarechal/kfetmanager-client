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
        subcategory: 'sous catégorie',
        category: 'catégorie',
        server: 'serveur',
        home: 'accueil',
        about: 'à propos',
        orders: 'commandes',
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

        from: 'à partir de',
        to: "jusqu'à",
        lessThan: 'moins que',
        moreThan: 'plus que',

        year: 'année',
        department: 'département',

        filters: 'filtres',

        price: 'prix',

        atDate: 'Date',

        manageProducts: 'gérer les produits',
        manageCustomers: 'gérer les clients',
        manageTreasury: 'gérer la trésorerie',

        orderHistory: 'historique des commandes',

        submitOrder: 'valider la commande',

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


        // --- Helps

        helpOrderHistoryDateField: `Lorsque ce champ est renseigné, les champs Date "À partir de" et "Jusqu'à" ne sont pas pris en compte.`,
        helpOrderHistoryLessThan: `0 = pas de limite.`,
        helpOrderHistoryDateAndTime: `- Si les deux (Date et Heure) sont renseignées, le logiciel va filtrer selon la date et l'heure (Ex: 03 avril 2018 à 16h30).\n`
        + `- Si uniquement les dates sont renseignées, le logiciel va filtrer selon les dates (Ex: entre entre le 12 mai et le 15 mai).\n`
        + `- Si uniquement les heures sont renseignées, le logiciel va filtrer les heures sans se préoccuper de la date (Ex: entre 12h30 et 14h00).`,

        'sort by product name': 'trier par nom de produit',
        'sort by price': 'trier par prix',
        'sort by orders number': 'trier par le nombre de commandes',

        'search for a product': 'rechercher un produit',

        'edit the selected product': 'modifier le produit sélectionné',
        'delete the selected product': 'supprimer le produit sélectionné',

        'add a product': 'ajouter un produit',
        'add a subcategory': 'ajouter une sous-catégorie',
        'add a category': 'ajouter une catégorie',

        'display only products of category': "n'afficher que les produits de la catégorie",
        'display only products of subcategory': "n'afficher que les produits de la sous-catégorie",

        'delete a product': 'supprimer un produit',

        'confirm': 'confirmer',
        'cancel': 'annuler',

        "this can't be undone": "cette action est irréversible",

        'create a product': 'créer un produit',
        'update a product': 'modifier un produit',

        'product name': 'nom du produit',

        'choose a subcategory': 'choisissez une sous-catégorie',

        'selling price': 'prix de vente',
        'purchase price': "prix d'achat",

        'name': 'nom',

        'warm dishes': 'plats réchauffés',

        'create a category': 'créer une catégorie',
        'create a subcategory': 'créer une sous-catégorie',

        'restockings': 'restockages',

        'comment': 'commentaire',

        'total cost': 'coût total',

        'new restocking': 'nouveau restockage',

        'restocking details': 'détails du restockage',
    };
}
