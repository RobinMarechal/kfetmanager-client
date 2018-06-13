import BaseModel from '../../libs/BaseModel';
import Product from './Product';
import Treasury from './Treasury';
import { isId, isNumber } from '../../libs/helpers';

export default class Restocking extends BaseModel {
    getFields() {
        return ['id', 'comment', 'total_cost', 'created_at', 'updated_at'];
    }

    isValid() {
        if (this.total_cost && !isNumber(total_cost)) {
            return false;
        }

        if(isId(this.id)){
            return true;
        }

        return isNumber(this.total_cost);
    }

    getRelations() {
        return {
            products: {
                class: Product,
                list: true,
            },
            treasury: {
                class: Treasury,
                list: false,
            },
        };
    }

    getDates() {
        return {
            created_at: 'datetime',
            updated_at: 'datetime',
        };
    }

    getNamespace() {
        return 'restockings';
    }
}