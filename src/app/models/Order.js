import BaseModel from '../../libs/BaseModel';
import Customer from './Customer';
import Product from './Product';
import Treasury from './Treasury';
import Menu from './Menu';
import { arraysEqual } from '../../libs/helpers';
import Category from './Category';

export default class Order extends BaseModel {
    getFields() {
        return ['id', 'customer_id', 'menu_id', 'final_price'];
    }

    getRelations() {
        return {
            customer: {
                class: Customer,
                list: false,
            },
            products: {
                class: Product,
                list: true,
            },
            menu: {
                class: Menu,
                list: false,
            },
            treasury: {
                class: Treasury,
                list: false,
            },
        };
    }

    getDates() {
        return {
            created_at: 'datetime',
            updated_at: 'datetime',
        };
    }

    getNamespace() {
        return 'orders';
    }

    static calculatePrice(orderCreation) {
        let basePrice = 0;
        let finalPrice = 0;
        let discount = orderCreation.discount;

        // Calculate base price
        if (orderCreation.menu.id) {
            basePrice = orderCreation.menu.price;
        }
        else {
            for (const { price } of orderCreation.products) {
                basePrice += price;
            }
        }

        // Calculate final price
        const isPercentage = discount[discount.length - 1] === '%';
        discount = parseFloat(discount);

        if(isNaN(discount)){
            return basePrice;
        }

        if (isPercentage) {
            finalPrice = basePrice - basePrice * discount / 100;
        }
        else {
            finalPrice = basePrice - discount;
        }

        return finalPrice;
    }

    static fromOrderCreation(orderCreation) {
        const {customer, menu} = orderCreation;

        const order = new Order();

        order.final_price = Order.calculatePrice(orderCreation);

        if(customer){
            // order.customer = customer; // useless
            order.customer_id = customer.id;
        }

        if(menu){
            // order.menu = menu; // useless
            order.menu_id = menu.id;
        }

        order.products = orderCreation.products;

        return order;
    }

    static async isValid(orderCreation) {
        const { menu, products } = orderCreation;

        if (products.length === 0) {
            return false;
        }

        if (!menu.id) {
            return true;
        }

        // menu, then all categories have to be filled
        const categories = await menu.lazyLoadAndGet('categories');

        if (categories.length !== products.length) {
            return false;
        }

        const selectedCategoriesId = [];
        const shouldBeSelectedId = categories.map(c => c.id);

        for (const p of products) {
            if (!p.category || !p.category.id) {
                p.category = await new Category().of(p).find();
            }

            selectedCategoriesId.push(p.category.id);
        }

        selectedCategoriesId.sort((a, b) => a < b);
        shouldBeSelectedId.sort((a, b) => a < b);

        if (arraysEqual(shouldBeSelectedId, selectedCategoriesId)) {
            return true;
        }

        return false;
    }
}