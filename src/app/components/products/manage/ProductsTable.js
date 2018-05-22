import React from 'react';
import { connect } from 'react-redux';
import Error from '../../utility/Error';
import Loading from '../../utility/Loading';
import lang from '../../../../resources/lang';
import classNames from 'classnames';
import { formatNumber, upperFirstLetter } from '../../../../libs/helpers';
import Config from '../../../../libs/Config';
import { faCaretDown, faCaretUp } from '@fortawesome/fontawesome-free-solid/index.es';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

const rowStyle = { lineHeight: '2.4rem' };

const PRODUCT_WIDTH = '25%';
const SUBCATEGORY_WIDTH = '25%';
const CATEGORY_WIDTH = '25%';
const PRICE_WIDTH = '10%';
const NB_ORDERS_WIDTH = '16.1%';

class ProductsTable extends React.Component {
    buildRows() {
        const { products, onSubcategoryClick, onCategoryClick, selected, onSelect } = this.props;

        let rows = products.items.map((product, i) => {
            const { name, price, id, subcategory } = product;
            let { name: subcategoryName, category } = subcategory;
            let { name: categoryName } = category;

            const nbOrders = product.orders.length;
            const formattedPrice = formatNumber(price);

            const isSelected = selected && selected.id === product.id;
            const isEven = i % 2 === 0;

            categoryName = upperFirstLetter(categoryName);
            subcategoryName = upperFirstLetter(subcategoryName);

            return (
                <div onClick={() => onSelect(product)}
                    style={rowStyle}
                    key={id}
                    className={classNames(
                    'hover:bg-purple-lighter w-full flex justify-between py-1', {
                        'bg-purple-lightest': !isSelected && isEven,
                        'bg-white': !isSelected && !isEven,
                        'bg-purple-lighter': isSelected,
                    })}>
                    <p style={{ width: PRODUCT_WIDTH }}  className="px-3 text-ellipsis-nowrap">
                        {upperFirstLetter(name)}
                    </p>
                    <p style={{ width: SUBCATEGORY_WIDTH }}  className="px-3 text-ellipsis-nowrap cursor-pointer hover:underline"
                       title={lang('display only products of subcategory' , upperFirstLetter) + ' ' + subcategoryName}
                       onClick={() => onSubcategoryClick(subcategory)}>
                        {upperFirstLetter(subcategoryName + '')}
                    </p>
                    <p style={{ width: CATEGORY_WIDTH }}
                       title={lang('display only products of category' , upperFirstLetter) + ' ' + categoryName}
                       className="px-3 text-ellipsis-nowrap cursor-pointer hover:underline"
                       onClick={() => onCategoryClick(category)}>
                        {categoryName}
                    </p>
                    <p style={{ width: PRICE_WIDTH }}
                       align="right"
                       className="px-3 text-ellipsis-nowrap">
                        {formattedPrice} €
                    </p>
                    <p style={{ width: NB_ORDERS_WIDTH }} align="right"  className="px-3 text-ellipsis-nowrap">
                        {nbOrders}
                    </p>
                </div>
            );

        });

        if (products.error) {
            rows = [...rows,
                <div style={rowStyle} key="error" className={classNames(
                    'w-full', {
                        'bg-purple-lightest': products.items.length % 2 === 0,
                        'bg-white': products.items.length % 2 === 1,
                    })}>
                    <Error className="py-3 text-red-light leading-normal" size="2x"/>
                </div>,
            ];
        }
        else if (products.loading) {
            rows = [...rows,
                <div style={rowStyle} key="loading" className={classNames(
                    'w-full', {
                        'bg-purple-lightest': products.items.length !== 0 && products.items.length % 2 === 0,
                        'bg-white': products.items.length === 0 || products.items.length % 2 === 1,
                    })}>
                    <Loading className="py-3" size="2x"/>
                </div>,
            ];
        }

        return rows;
    }

    buildCaret(orderBy, direction) {
        const caret = {};
        const icon = direction === '' ? faCaretDown : faCaretUp;

        switch (orderBy) {
            case 'name' :
                caret.name = <FontAwesomeIcon icon={icon} className="text-grey-dark ml-2"/>;
                break;
            case 'subcategory':
                caret.subcategory = <FontAwesomeIcon icon={icon} className="text-grey-dark ml-2"/>;
                break;
            case 'category':
                caret.category = <FontAwesomeIcon icon={icon} className="text-grey-dark ml-2"/>;
                break;
            case 'price':
                caret.price = <FontAwesomeIcon icon={icon} className="text-grey-dark mr-2"/>;
                break;
            case 'nbOrders':
                caret.nbOrders = <FontAwesomeIcon icon={icon} className="text-grey-dark mr-2"/>;
                break;
        }

        return caret;
    }


    render() {
        const { onSort, orderBy, orderDirection } = this.props;
        const rows = this.buildRows();

        const caret = this.buildCaret(orderBy, orderDirection);

        return (
            <div className="flex flex-col justify-start text-grey-darkest">
                <div className="flex justify-between leading-loose font-bold text-xl">
                    <p style={{ width: PRODUCT_WIDTH }}
                       onClick={() => onSort('name')}
                       title={lang('sort by product name', upperFirstLetter)}
                       className="px-3 py-1 inline hover:bg-purple-lighter cursor-pointer">
                        {lang('product', upperFirstLetter)}
                        {caret.name}
                    </p>
                    <p style={{ width: SUBCATEGORY_WIDTH }}
                       onClick={() => onSort('subcategory')}
                       className="px-3 py-1 inline hover:bg-purple-lighter cursor-pointer">
                        {lang('subcategory', upperFirstLetter)}
                        {caret.subcategory}
                    </p>
                    <p style={{ width: CATEGORY_WIDTH }}
                       onClick={() => onSort('category')}
                       className="px-3 py-1 inline hover:bg-purple-lighter cursor-pointer">
                        {lang('category', upperFirstLetter)}
                        {caret.category}
                    </p>
                    <p style={{ width: PRICE_WIDTH }}
                       onClick={() => onSort('price')}
                       title={lang('sort by price', upperFirstLetter)}
                       className="px-2 py-1 inline pr-3 hover:bg-purple-lighter cursor-pointer"
                       align="right">
                        {caret.price}
                        {lang('price', upperFirstLetter)}
                    </p>
                    <p style={{ width: NB_ORDERS_WIDTH }}
                       onClick={() => onSort('nbOrders')}
                       title={lang('sort by orders number', upperFirstLetter)}
                       className="px-2 py-1 inline pr-3 hover:bg-purple-lighter cursor-pointer"
                       align="right">
                        {caret.nbOrders}
                        {lang('orders', upperFirstLetter)}
                    </p>
                </div>
                <div style={{ height: Config.bodyHeight }} className="overflow-y-auto w-full">
                    {rows}
                    {/*<Waypoint onEnter={this.props.onEnter}/>*/}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

export default connect(mapStateToProps)(ProductsTable);
