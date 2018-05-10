import BaseModel from '../../libs/BaseModel';
import Group from './Group';
import Order from './Order';

export default class Customer extends BaseModel{
    getFields(){
        return ['id', 'name', 'email', 'balance', 'year', 'department'];
    }

    getRelations(){
        return {
            groups: {
                instance: new Group(),
                list: true,
            },
            orders: {
                instance: new Order(),
                list: true,
            },
        }
    }

    getNamespace(){
        return 'customers';
    }
}