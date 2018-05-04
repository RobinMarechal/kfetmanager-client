import BaseModel from '../../libs/BaseModel';
import Restocking from './Restocking';
import Order from './Order';
import Subcategory from './Subcategory';

export default class Product extends BaseModel{
    getFields(){
        return ['id', 'name', 'subcategory_id', 'purchase_price', 'price', 'stock'];
    }

    getRelations(){
        return {
            restockings: {
                instance: new Restocking(),
                list: true,
            },
            orders: {
                instance: new Order(),
                list: true,
            },
            subcategory: {
                instance: new Subcategory(),
                list: false,
            },
        }
    }

    getNamespace(){
        return 'products';
    }
}