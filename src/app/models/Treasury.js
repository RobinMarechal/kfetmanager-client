import BaseModel from '../../libs/BaseModel';
import TreasuryDAO from '../DAO/TreasuryDAO';
import CashFlow from './CashFlow';
import Order from './Order';
import Restocking from './Restocking';

export default class Treasury extends BaseModel {
    static async getTreasury() {
        return await new Treasury().orderByDesc('id').limit(1).all();
    }

    getFields() {
        return ['id', 'created_at', 'movement_type', 'movement_id', 'movement_operation', 'balance'];
    }

    getRelations() {
        return {
            cash_flow: {
                instance: new CashFlow(),
                list: false,
            },
            order: {
                instance: new Order(),
                list: false,
            },
            restocking: {
                instance: new Restocking(),
                list: false,
            },
        };
    }

    getNamespace() {
        return 'treasuries';
    }

    getDates() {
        return {
            created_at: 'datetime',
        };
    }
}