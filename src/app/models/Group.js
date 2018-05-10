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
                instance: new Customer(),
                list: true
            },
            subcategories: {
                instance: new Subcategory(),
                list: true
            },
            discounts: {
                instance: new Discount(),
                list: true
            },
        }
    }

    getNamespace(){
        return 'groups';
    }
}