import BaseModel from '../../libs/BaseModel';
import Subcategory from './Subcategory';
import Menu from './Menu';

export default class Category extends BaseModel{
    getFields(){
        return ['id', 'name'];
    }

    getRelations(){
        return {
            subcategories: {
                instance: new Subcategory(),
                list: true
            },
            menus: {
                instance: new Menu(),
                list: true
            },
        }
    }

    getNamespace(){
        return 'categories';
    }
}