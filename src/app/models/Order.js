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
                class: Customer,
                list: false
            },
            products:{
                class: Product,
                list: true
            },
            menu: {
                class: Menu,
                list: false
            },
            treasury: {
                class: Treasury,
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