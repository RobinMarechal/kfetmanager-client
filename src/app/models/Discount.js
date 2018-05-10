import BaseModel from '../libs/BaseModel';
import Group from './Group';
import Subcategory from './Subcategory';

export default class Discount extends BaseModel{
    getFields(){
        return ['group_id', 'subcategory_id', 'value', 'percentage'];
    }

    getRelations(){
        return {
            group: {
                instance: new Group(),
                list: false
            },
            subcategory: {
                instance: new Subcategory(),
                list: false
            }
        }
    }

    getNamespace(){
        return 'discounts';
    }
}