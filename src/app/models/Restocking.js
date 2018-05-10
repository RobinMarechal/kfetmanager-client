import BaseModel from '../../libs/BaseModel';
import Product from './Product';
import Treasury from './Treasury';

export default class Restocking extends BaseModel {
    getFields(){
        return ['id', 'comment', 'total_cost', 'created_at', 'updated_at'];
    }

    getRelations(){
        return {
            products: {
                instance: new Product(),
                list: true
            },
            treasury: {
                instance: new Treasury(),
                list: false
            },
        }
    }

    getDates(){
        return {
            created_at: 'datetime',
            updated_at: 'datetime',
        }
    }

    getNamespace(){
        return 'restockings';
    }
}