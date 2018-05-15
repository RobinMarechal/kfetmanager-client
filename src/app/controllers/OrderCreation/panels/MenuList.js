import React from 'react';
import { connect } from 'react-redux';
import lang from '../../../../resources/lang/index';
import { upperFirstLetter } from '../../../../libs/helpers';
import { fetchMenuBegin, fetchMenuError, fetchMenuSuccess, menuClicked } from '../../../actions/models/menus/index';
import Menu from '../../../models/Menu';
import Error from '../../../components/utility/Error';
import MenuListItem from '../../../containers/orderCreation/menu/MenuListItem';
import OrderCreationTitle from '../../../containers/orderCreation/common/OrderCreationTitle';
import OrderCreationSearchBar from '../../../containers/orderCreation/common/OrderCreationSearchBar';
import OrderCreationFooter from '../../../containers/orderCreation/common/OrderCreationFooter';
import OrderCreationContainer from '../../../containers/orderCreation/common/OrderCreationContainer';
import { bindActionCreators } from 'redux';
import OrderCreationBreadcrumb, { BREADCRUMB_MENU } from '../../../containers/orderCreation/common/OrderCreationBreadcrumb';
import { revalidateOrder } from '../../../reducers/orders/orderCreationReducer';
import { orderValidated } from '../../../actions/models/orders';

class MenuList extends React.Component {

    constructor(props) {
        super(props);

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

        const { orderCreation, menus } = this.props;
        const { error, items } = menus;

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

        return items.map((item) => <MenuListItem key={item.id}
                                                 onClick={this.handleMenuClick}
                                                 orderCreation={orderCreation}
                                                 menu={item}/>);
    }

    render() {
        const { previous, next, orderCreation, toggleKeymaps } = this.props;

        return (
            <OrderCreationContainer>
                <div>
                    <OrderCreationBreadcrumb current={BREADCRUMB_MENU}/>

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

    async handleMenuClick(menu) {
        const { orderCreation, menuClicked, orderValidated } = this.props;

        menuClicked(menu);
        await revalidateOrder(orderCreation, orderValidated);
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
        orderCreation: state.orderCreation,
        menus: state.menus,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            menuClicked,
            orderValidated,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(MenuList);