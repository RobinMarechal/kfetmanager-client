import BaseModel from '../../libs/BaseModel';
import Customer from './Customer';
import Subcategory from './Subcategory';
import Discount from './Discount';

export default class Group extends BaseModel{
    getFields(){
        return ['id', 'name'];
    }

    getRelations(){
        return {
            customers: {
                class: Customer,
                list: true
            },
            subcategories: {
                class: Subcategory,
                list: true
            },
            discounts: {
                class: Discount,
                list: true
            },
        }
    }

    getNamespace(){
        return 'groups';
    }
}