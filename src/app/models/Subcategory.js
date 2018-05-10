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
                instance: new Product(),
                list: true
            },
            category: {
                instance: new Category(),
                list: false
            },
            discounts: {
                instance: new Discount(),
                list: true
            },
            groups: {
                instance: new Group(),
                list: true
            },
        }
    }

    getNamespace(){
        return 'subcategories';
    }
}