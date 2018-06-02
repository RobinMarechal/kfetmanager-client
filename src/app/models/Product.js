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
     * @param {string} orderBy name|price|subcategory|category|nbOrders
     * @param {boolean} desc false|true. true => sort descending order, false => ascending order
     */
    static sortProductsListBy(products, orderBy, desc = false) {
        switch (orderBy) {
            case 'subcategory':
                return this._sortProductsListBySubcategory(products, desc);
            case 'category':
                return this._sortProductsListByCategory(products, desc);
            case 'nbOrders':
                return this._sortProductsListByOrderNumber(products, desc);
            case 'name':
                return this._sortProductsListByName(products, desc);
            case 'price':
                return this._sortProductsListByPrice(products, desc);
            default:
                return products;
        }
    }

    static _sortProductsListByCategory(products, desc) {
        return products.sort((a, b) => {
            return a.subcategory.category.name.toLowerCase().localeCompare(b.subcategory.category.name.toLowerCase()) * (desc ? -1 : 1);
        });
    }

    static _sortProductsListBySubcategory(products, desc) {
        return products.sort((a, b) => {
            return a.subcategory.name.toLowerCase().localeCompare(b.subcategory.name.toLowerCase()) * (desc ? -1 : 1);
        });
    }

    static _sortProductsListByName(products, desc) {
        return products.sort((a, b) => {
            return a.name.toLowerCase().localeCompare(b.name.toLowerCase()) * (desc ? -1 : 1);
        });
    }

    static _sortProductsListByOrderNumber(products, desc) {
        return products.sort((a, b) => {
            return (a.orders.length - b.orders.length) * (desc ? -1 : 1);
        });
    }

    static _sortProductsListByPrice(products, desc) {
        return products.sort((a, b) => {
            return (a.price - b.price) * (desc ? -1 : 1);
        });
    }

    static removeProductFromList(products, product) {
        return products.filter(({ id }) => product.id !== id);
    }
}