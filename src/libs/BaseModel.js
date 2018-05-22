import {Model} from 'laravel-rest-api-query-builder';

export default class BaseModel extends Model {
    fromTime(time){
        this.queryBuilder.addCustomParameter('fromTime', time);
    }

    toTime(time){
        this.queryBuilder.addCustomParameter('toTime', time);
    }
}