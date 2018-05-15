import BaseModel from '../../libs/BaseModel';
import Group from './Group';
import Subcategory from './Subcategory';

export default class Discount extends BaseModel{
    getFields(){
        return ['group_id', 'subcategory_id', 'value', 'percentage'];
    }

    getRelations(){
        return {
            group: {
                class: Group,
                list: false
            },
            subcategory: {
                class: Subcategory,
                list: false
            }
        }
    }

    getNamespace(){
        return 'discounts';
    }
}