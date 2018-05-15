import BaseModel from '../../libs/BaseModel';
import Category from './Category';
import Order from './Order';

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
}