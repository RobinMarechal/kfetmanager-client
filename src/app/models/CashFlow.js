import BaseModel from '../../libs/BaseModel';
import Treasury from './Treasury';

export default class CashFlow extends BaseModel{
    getFields(){
        return ['id', 'amount', 'description'];
    }

    getRelations(){
        return {
            treasury: {
                instance: new Treasury(),
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
}