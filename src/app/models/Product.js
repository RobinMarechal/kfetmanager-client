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

    static productsFromCategories(categories) {
        return undefined;
    }
}