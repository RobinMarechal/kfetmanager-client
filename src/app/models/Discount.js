import BaseModel from '../../libs/BaseModel';
import Group from './Group';
import Subcategory from './Subcategory';
import { isBoolean, isId, isNumber } from '../../libs/helpers';

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


    isValid() {
        if (
            (this.value && !isNumber(this.value)) ||
            (this.group_id && (!isId(this.group_id))) ||
            (this.subcategory_id && (!isId(this.subcategory_id))) ||
            (this.percentage !== undefined && !isBoolean(this.percentage))
        ) {
            return false;
        }

        if (isId(this.id)) {
            return true;
        }

        return this.group_id && this.subcategory_id && isBoolean(this.percentage) && isNumber(this.value)
    }
}