import BaseModel from '../../libs/BaseModel';
import Subcategory from './Subcategory';
import Menu from './Menu';
import Product from './Product';

export default class Category extends BaseModel {
    getFields() {
        return ['id', 'name'];
    }

    getRelations() {
        return {
            subcategories: {
                class: Subcategory,
                list: true,
            },
            products: {
                class: Product,
                list: true,
            },
            menus: {
                class: Menu,
                list: true,
            },
        };
    }

    getNamespace() {
        return 'categories';
    }

    static filterListByProductName(categories, search) {
        if (!search || search === '') {
            return categories;
        }

        search = search.toLowerCase();

        const catToKeep = [];

        for (const cat of categories) {
            const subToKeep = [];
            for (const sub of cat.subcategories) {
                const products = sub.products.filter((p) => p.name.toLowerCase().includes(search));
                if (products.length > 0) {
                    sub.products = products;
                    subToKeep.push(sub);
                }
            }

            if (subToKeep.length > 0) {
                cat.subcategories = subToKeep;
                catToKeep.push(cat);
            }
        }

        return catToKeep;
    }
}