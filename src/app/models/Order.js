import BaseModel from '../../libs/BaseModel';
import Customer from './Customer';
import Product from './Product';
import Treasury from './Treasury';
import Menu from './Menu';

export default class Order extends BaseModel{
    getFields(){
        return ['id', 'customer_id', 'menu_id', 'final_price'];
    }

    getRelations(){
        return {
            customer: {
                instance: new Customer(),
                list: false
            },
            products:{
                instance: new Product(),
                list: true
            },
            menu: {
                instance: new Menu(),
                list: false
            },
            treasury: {
                instance: new Treasury(),
                list: false
            }
        }
    }

    getDates(){
        return {
            created_at: 'datetime',
            updated_at: 'datetime',
        }
    }

    getNamespace(){
        return 'orders';
    }
}