import React from 'react';
import { connect } from 'react-redux';
import Error from '../../utility/Error';
import Loading from '../../utility/Loading';
import lang from '../../../../resources/lang';
import classNames from 'classnames';
import { customDateFormat, formatNumber, upperFirstLetter } from '../../../../libs/helpers';
import Waypoint from 'react-waypoint';
import Config from '../../../../libs/Config';

const rowStyle = { lineHeight: '2.4rem' };

const DATE_WIDTH = '18%';
const NAME_WIDTH = '22%';
const MENU_WIDTH = '20%';
const PRICE_WIDTH = '10%';

const PRODUCTS_WIDTH = '30%';

class OrdersTable extends React.Component {

    buildRows() {
        const { orders } = this.props;

        let rows = orders.items.map((order, i) => {
            const { id, created_at, customer, menu, products, final_price } = order;

            const formattedDate = customDateFormat(created_at, lang('orderHistoryDateTimeFormat'));
            const formattedCustomer = customer && customer.name ? customer.name : '-';
            const formattedMenu = menu && menu.name ? menu.name : '-';
            const formattedProducts = !products || products.length === 0 ? '-' : products.map(p => upperFirstLetter(p.name)).join(', ');
            const formattedPrice = formatNumber(final_price) + ' €';

            return (
                <div style={rowStyle} key={id} className={classNames(
                    'hover:bg-purple-lighter w-full flex justify-between py-1', {
                        'bg-purple-lightest': i % 2 === 0,
                        'bg-white': i % 2 === 1,
                    })}>
                    <p style={{ width: DATE_WIDTH }} className="px-3">
                        {formattedDate}
                    </p>
                    <p style={{ width: NAME_WIDTH }} className="px-3 capitalize">
                        {formattedCustomer}
                    </p>
                    <p style={{ width: MENU_WIDTH }} className="px-3 capitalize">
                        {formattedMenu}
                    </p>
                    <p style={{ width: PRODUCTS_WIDTH }}
                       className="px-3 w-full overflow-y-auto whitespace-no-wrap horizontal-scrollbar rounded-scrollbar">
                        {formattedProducts}
                    </p>
                    <p style={{ width: PRICE_WIDTH }} align="right" className="px-3">
                        {formattedPrice}
                    </p>
                </div>
            );

        });

        if (orders.error) {
            rows = [...rows,
                <div style={rowStyle} key="error" className={classNames(
                    'w-full', {
                        'bg-purple-lightest': orders.items.length % 2 === 0,
                        'bg-white': orders.items.length % 2 === 1,
                    })}>
                    <Error className="py-3 text-red-light leading-normal" size="2x"/>
                </div>,
            ];
        }
        else if (orders.loading) {
            rows = [...rows,
                <div style={rowStyle} key="loading" className={classNames(
                    'w-full', {
                        'bg-purple-lightest': orders.items.length !== 0 && orders.items.length % 2 === 0,
                        'bg-white': orders.items.length === 0 || orders.items.length % 2 === 1,
                    })}>
                    <Loading className="py-3" size="2x"/>
                </div>,
            ];
        }

        return rows;
    }


    render() {
        const rows = this.buildRows();

        return (
            <div className="flex flex-col justify-start text-grey-darkest">
                <div className="flex justify-between py-1 leading-loose font-bold text-xl">
                    <p style={{ width: DATE_WIDTH }} className="px-4 inline">Date</p>
                    <p style={{ width: NAME_WIDTH }} className="px-4 inline">{lang('customer', upperFirstLetter)}</p>
                    <p style={{ width: MENU_WIDTH }} className="px-4 inline">{lang('menu', upperFirstLetter)}</p>
                    <p style={{ width: PRODUCTS_WIDTH }} className="w-full px-4 inline">{lang('products', upperFirstLetter)}</p>
                    <p style={{ width: PRICE_WIDTH }} className="px-4 inline pr-6" align="right">{lang('price', upperFirstLetter)}</p>
                </div>
                <div style={{ height: Config.bodyHeight }} className="overflow-y-auto w-full">
                    {rows}
                    <Waypoint onEnter={this.props.onEnter}/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
    };
}

export default connect(mapStateToProps)(OrdersTable);
