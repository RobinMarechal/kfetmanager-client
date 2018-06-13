import BaseModel from '../../libs/BaseModel';
import Category from './Category';
import Order from './Order';
import { isId, isNumber } from '../../libs/helpers';

export default class Menu extends BaseModel{
    getFields(){
        return ['id', 'name', 'price'];
    }

    getRelations(){
        return {
            categories: {
                class: Category,
                list: true
            },
            orders: {
                class: Order,
                list: true
            },
        }
    }

    getNamespace(){
        return 'menus';
    }

    isValid(){
        return isId(this.id) || (this.name && isNumber(this.price));
    }
}