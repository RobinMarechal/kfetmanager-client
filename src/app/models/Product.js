import BaseModel from '../../libs/BaseModel';
import Restocking from './Restocking';
import Order from './Order';
import Subcategory from './Subcategory';
import Category from './Category';

export default class Product extends BaseModel {
    getFields() {
        return ['id', 'name', 'subcategory_id', 'purchase_price', 'price', 'stock'];
    }

    getRelations() {
        return {
            restockings: {
                class: Restocking,
                list: true,
            },
            orders: {
                class: Order,
                list: true,
            },
            subcategory: {
                class: Subcategory,
                list: false,
            },
            category: {
                class: Category,
                list: false,
            },
        };
    }

    getNamespace() {
        return 'products';
    }

    /**
     *
     * @param {array<Customer>} products
     * @param {string} orderBy subcategory|category|nbOrders
     * @param {boolean} desc false|true. true => sort descending order, false => ascending order
     */
    static sortCustomersListBy(products, orderBy, desc = false) {
        if (orderBy === 'subcategory') {
            this._sortCustomersListBySubcategory(products, desc);
        }
        else if (orderBy === 'category') {
            this._sortCustomersListByCategory(products, desc);
        }
        else if (orderBy === 'nbOrders') {
            this._sortCustomersListByOrderNumber(products, desc);
        }

        switch(orderBy){
            case 'subcategory':
                this._sortCustomersListBySubcategory(products, desc);
                break;
            case 'category':
                this._sortCustomersListByCategory(products, desc);
                break;
            case 'nbOrders':
                this._sortCustomersListByOrderNumber(products, desc);
                break;
            case 'name':
                this._sortCustomersListByName(products, desc);
                break;
            case 'price':
                this._sortCustomersListByPrice(products, desc);
                break;
        }
    }

    static _sortCustomersListByCategory(products, desc) {
        products.sort((a, b) => {
            return a.subcategory.category.name.toLowerCase().localeCompare(b.subcategory.category.name.toLowerCase()) * (desc ? -1 : 1);
        });
    }

    static _sortCustomersListBySubcategory(products, desc) {
        products.sort((a, b) => {
            return a.subcategory.name.toLowerCase().localeCompare(b.subcategory.name.toLowerCase()) * (desc ? -1 : 1);
        });
    }

    static _sortCustomersListByName(products, desc) {
        products.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) * (desc ? -1 : 1);
        });
    }

    static _sortCustomersListByOrderNumber(products, desc) {
        products.sort((a, b) => {
            return (a.orders.length - b.orders.length) * (desc ? -1 : 1);
        });
    }

    static _sortCustomersListByPrice(products, desc) {
        products.sort((a, b) => {
            return (a.price - b.price) * (desc ? -1 : 1);
        });
    }
}