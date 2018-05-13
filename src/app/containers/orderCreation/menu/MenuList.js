import React from 'react';
import { connect } from 'react-redux';
import { faArrowLeft, faArrowRight } from '@fortawesome/fontawesome-free-solid/index';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import lang from '../../../../resources/lang/index';
import { awaitOrEmpty } from '../../../../libs/helpers';
import { fetchMenuBegin, fetchMenuError, fetchMenuSuccess } from '../../../actions/models/menus/index';
import Menu from '../../../models/Menu';
import Error from '../../../components/utility/Error';
import MenuListItem from './MenuListItem';

class MenuList extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
        };
    }

    componentDidMount() {
        this.props.dispatch(this.fetchMenus());
    }


    fetchMenus() {
        return async function (dispatch) {
            dispatch(fetchMenuBegin());
            try{
                let menus = await new Menu().orderBy('name').with('categories').all();
                dispatch(fetchMenuSuccess(menus));
                return menus;
            }
            catch(e){
                dispatch(fetchMenuError());
                return [];
            }
        };
    }

    render(){
        const { error, items } = this.props.menus;

        if (error) {
            return <Error/>;
        }

        return (
            <div className="w-2/3 p-4 mr-3 rounded shadow-md h-full">
                <h2 className="capitalize mb-4 flex justify-between text-grey-darkest">
                    <button className="text-grey-darker border rounded px-4 py-1 hover:bg-grey-lightest hover:shadow" onClick={this.props.previous}>
                        <FontAwesomeIcon icon={faArrowLeft} size="lg"/>
                    </button>
                    {lang('menuSelection')}
                    <button className="text-grey-darker border rounded px-4 py-1 hover:bg-grey-lightest hover:shadow" onClick={this.props.next}>
                        <FontAwesomeIcon icon={faArrowRight} size="lg"/>
                    </button>
                </h2>

                <div className="flex justify-center flex-wrap">
                    {items.map((item) => <MenuListItem key={item.id} menu={item}/>)}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state
    }
}

export default connect(mapStateToProps)(MenuList);