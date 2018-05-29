import React from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { customDateFormat, formatNumber, upperFirstLetter } from '../../../libs/helpers';
import Error from '../utility/Error';
import Loading from '../utility/Loading';
import Config from '../../../libs/Config';
import lang from '../../../resources/lang';
import Waypoint from 'react-waypoint';

const rowStyle = { lineHeight: '2.4rem' };

const DATE_WIDTH = '300px';
const COST_WIDTH = '200px';
const PRODUCTS_WIDTH = '50%';
const COMMENT_WIDTH = '50%';

class RestockingsTable extends React.Component {

    buildRows() {
        const { restockings, onDoubleClick } = this.props;

        let rows = restockings.items.map((restocking, i) => {
            const { id, created_at, products, comment, total_cost } = restocking;

            const formattedDate = customDateFormat(created_at, lang('orderHistoryDateTimeFormat'));
            const formattedComment = !comment ? '-' : upperFirstLetter(comment);
            const formattedProducts = products.map((p) => upperFirstLetter(p.name)).join(', ');
            const formattedCost = formatNumber(total_cost) + ' €';

            return (
                <div style={rowStyle}
                     onDoubleClick={() => onDoubleClick(restocking)}
                     key={id}
                     className={classNames(
                         'hover:bg-purple-lighter w-full flex justify-between py-1', {
                             'bg-purple-lightest': i % 2 === 0,
                             'bg-white': i % 2 === 1,
                         })}>
                    <p style={{ width: DATE_WIDTH }} className="px-3">
                        {formattedDate}
                    </p>
                    <p style={{ width: PRODUCTS_WIDTH, marginRight: "1%" }}
                       title={formattedProducts.split(', ').join("\n")}
                       className="px-3 text-ellipsis-nowrap">
                        {formattedProducts}
                    </p>
                    <p style={{ width: COMMENT_WIDTH }}
                       className="px-3 text-ellipsis-nowrap"
                       title={formattedComment}>
                        {formattedComment}
                    </p>
                    <p style={{ width: COST_WIDTH }}
                       className="px-3">
                        {formattedCost}
                    </p>
                </div>
            );

        });

        if (restockings.error) {
            rows = [...rows,
                <div style={rowStyle} key="error" className={classNames(
                    'w-full', {
                        'bg-purple-lightest': restockings.items.length % 2 === 0,
                        'bg-white': restockings.items.length % 2 === 1,
                    })}>
                    <Error className="py-3 text-red-light leading-normal" size="2x"/>
                </div>,
            ];
        }
        else if (restockings.loading) {
            rows = [...rows,
                <div style={rowStyle} key="loading" className={classNames(
                    'w-full', {
                        'bg-purple-lightest': restockings.items.length !== 0 && restockings.items.length % 2 === 0,
                        'bg-white': restockings.items.length === 0 || restockings.items.length % 2 === 1,
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
            <div className="flex flex-col justify-start text-grey-darkest shadow rounded">
                <div className="flex justify-between py-1 leading-loose font-bold text-xl">
                    <p style={{ width: DATE_WIDTH }} className="px-4 inline">Date</p>
                    <p style={{ width: PRODUCTS_WIDTH }} className="px-4 inline">{lang('products', upperFirstLetter)}</p>
                    <p style={{ width: COMMENT_WIDTH }} className="px-4 inline">{lang('comment', upperFirstLetter)}</p>
                    <p style={{ width: COST_WIDTH }} className="px-4 inline">{lang('total cost', upperFirstLetter)}</p>
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
        restockings: state.restockings,
    };
}

export default connect(mapStateToProps)(RestockingsTable);
