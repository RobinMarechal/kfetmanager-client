import BaseModel from '../../libs/BaseModel';
import Treasury from './Treasury';
import { isId, isNumber } from '../../libs/helpers';

export default class CashFlow extends BaseModel{
    getFields(){
        return ['id', 'amount', 'description'];
    }

    getRelations(){
        return {
            treasury: {
                class: Treasury,
                list: false
            }
        };
    }

    getDates(){
        return {
            created_at: 'datetime',
            updated_at: 'datetime',
        }
    }

    getNamespace(){
        return 'treasuries';
    }

    isValid(){
        if(this.amount && !isNumber(this.amount)){
            return false;
        }

        return isId(this.id) || isNumber(this.amount);
    }
}