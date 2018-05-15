import BaseModel from '../../libs/BaseModel';
import Product from './Product';
import Category from './Category';
import Discount from './Discount';
import Group from './Group';

export default class Subcategory extends BaseModel{
    getFields(){
        return ['id', 'name', 'category_id'];
    }

    getRelations(){
        return {
            products: {
                class: Product,
                list: true
            },
            category: {
                class: Category,
                list: false
            },
            discounts: {
                class: Discount,
                list: true
            },
            groups: {
                class: Group,
                list: true
            },
        }
    }

    getNamespace(){
        return 'subcategories';
    }
}