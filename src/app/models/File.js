import BaseModel from '../../libs/BaseModel';

export default class File extends BaseModel {
    getFields() {
        return ['id', 'type', 'path', 'comment', 'from', 'to'];
    }

    getDates() {
        return {
            from: 'date',
            to: 'date',
        };

    }

    getNamespace() {
        return 'files';
    }
}