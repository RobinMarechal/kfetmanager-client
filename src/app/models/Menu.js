import BaseModel from '../libs/BaseModel';
import Category from './Category';
import Order from './Order';

export default class Menu extends BaseModel{
    getFields(){
        return ['id', 'name', 'price'];
    }

    getRelations(){
        return {
            categories: {
                instance: new Category(),
                list: true
            },
            orders: {
                instance: new Order(),
                list: true
            },
        }
    }

    getNamespace(){
        return 'menus';
    }
}