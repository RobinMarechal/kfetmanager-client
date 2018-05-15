import React from 'react';
import { connect } from 'react-redux';
import lang from '../../../../resources/lang/index';
import { upperFirstLetter } from '../../../../libs/helpers';
import { fetchMenuBegin, fetchMenuError, fetchMenuSuccess } from '../../../actions/models/menus/index';
import Menu from '../../../models/Menu';
import Error from '../../../components/utility/Error';
import MenuListItem from './MenuListItem';
import OrderCreationTitle from '../common/OrderCreationTitle';
import OrderCreationSearchBar from '../common/OrderCreationSearchBar';
import OrderCreationFooter from '../common/OrderCreationFooter';
import OrderCreationContainer from '../common/OrderCreationContainer';
import { bindActionCreators } from 'redux';
import { menuClicked } from '../../../actions/models/menus';

class MenuList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            inputValue: '',
        };

        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchMenus = this.fetchMenus.bind(this);
        this.handleMenuClick = this.handleMenuClick.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(this.fetchMenus());
    }


    fetchMenus(...wheres) {
        return async function (dispatch) {
            dispatch(fetchMenuBegin());
            try {
                let query = await new Menu().orderBy('name').with('categories');

                for (const w of wheres) {
                    query = query.where(w.left, w.operator, w.right);
                }

                const menus = await query.all();

                dispatch(fetchMenuSuccess(menus));
                return menus;
            }
            catch (e) {
                dispatch(fetchMenuError());
                return [];
            }
        };
    }

    buildList() {

        const { error, items } = this.props.menus;

        if (error) {
            return <Error/>;
        }

        if (items.length === 0) {
            return (
                <div className="px-4 py-2 list-style-none">
                    <p className="pl-6 text-center">
                        -
                    </p>
                </div>
            );
        }

        return items.map((item) => <MenuListItem onClick={this.handleMenuClick} key={item.id} menu={item}/>);
    }

    render() {
        const { previous, next, orderCreation, toggleKeymaps } = this.props;

        return (
            <OrderCreationContainer>

                <div>
                    <OrderCreationTitle
                        previous={previous}
                        next={next}
                        title={lang('menuSelection')}
                    />

                    <OrderCreationSearchBar
                        placeholder={lang('searchMenu', upperFirstLetter)}
                        onKeyDown={this.handleInputChange}
                        onChange={this.handleInputChange}
                        onFocus={toggleKeymaps}
                        onBlur={toggleKeymaps}
                    />
                </div>


                <div className="flex justify-center flex-wrap overflow-y-auto my-4 border rounded">
                    {this.buildList()}
                </div>

                <OrderCreationFooter
                    title={lang('selectedMenu', upperFirstLetter)}
                    name={orderCreation.menu.name}
                />

            </OrderCreationContainer>
        );
    }

    handleMenuClick(menu) {
        this.props.menuClicked(menu);
    }

    handleInputChange(event) {
        this.props.dispatch(this.fetchMenus({
            left: 'name',
            operator: 'LIKE',
            right: '%' + event.target.value + '%',
        }));
    }

    handleInputKeyDown(event) {

    }
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            menuClicked,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);