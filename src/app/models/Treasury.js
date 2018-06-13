import BaseModel from '../../libs/BaseModel';
import CashFlow from './CashFlow';
import Order from './Order';
import Restocking from './Restocking';
import _ from 'lodash';
import { isId, isNumber } from '../../libs/helpers';

export default class Treasury extends BaseModel {

    static MOVEMENT_OPERATION_INSERT = 'INSERT';
    static MOVEMENT_OPERATION_DELETE = 'DELETE';
    static MOVEMENT_OPERATION_UPDATE = 'UPDATE';

    static MOVEMENT_TYPE_ORDER = 'ORDER';
    static MOVEMENT_TYPE_CASH_FLOW = 'CASH_FLOW';
    static MOVEMENT_TYPE_RESTOCKING = 'RESTOCKING';


    static MOVEMENT_OPERATIONS = [
        Treasury.MOVEMENT_OPERATION_DELETE,
        Treasury.MOVEMENT_OPERATION_UPDATE,
        Treasury.MOVEMENT_OPERATION_INSERT,
    ];

    static MOVEMENT_TYPES = [
        Treasury.MOVEMENT_TYPE_ORDER,
        Treasury.MOVEMENT_TYPE_CASH_FLOW,
        Treasury.MOVEMENT_TYPE_RESTOCKING,
    ];

    static async getTreasury() {
        const res = await new Treasury().orderByDesc('id').limit(1).all();

        if (_.isEmpty(res))
            return [];

        return res[0];
    }

    getFields() {
        return ['id', 'created_at', 'movement_type', 'movement_id', 'movement_operation', 'balance'];
    }

    _checkMovementType(type) {
        return Treasury.MOVEMENT_TYPES.includes(type);
    }

    _checkMovementOperation(operation) {
        return Treasury.MOVEMENT_OPERATIONS.includes(operation);
    }

    isValid() {
        if (
            (this.movement_type && !this._checkMovementType(this.movement_type)) ||
            (this.movement_operation && !this._checkMovementOperation(this.movement_operation)) ||
            (this.movement_id && !isId(this.movement_id)) ||
            (this.balance && !isNumber(this.balance))
        ) {
            return false;
        }

        if(isId(this.id)){
            return true;
        }

        return this.movement_type && this.movement_operation && isId(this.movement_id) && isNumber(this.balance);
    }

    getRelations() {
        return {
            cash_flow: {
                class: CashFlow,
                list: false,
            },
            order: {
                class: Order,
                list: false,
            },
            restocking: {
                class: Restocking,
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