import React from 'react';
import Panel from '../../components/panel/Panel';
import lang from '../../../resources/lang/index';
import { capitalize, stringPlural } from '../../../libs/helpers';
import { connect } from 'react-redux';
import { faPlus, faSyncAlt } from '@fortawesome/fontawesome-free-solid/index';

class ProductsPanel extends React.Component {

    buildItems(products) {

        return products.map((product) => {
            const { name, subcategory, stock } = product;
            return {
                left: [
                    name,
                    subcategory.name + ', ' + subcategory.category.name,
                ],
                right: [
                    stock,
                ],
                baseData: product,
            };
        });
    }

    buildTitleProps() {
        const { onSync } = this.props;
        return {
            title: lang("product", stringPlural, capitalize),
            buttons: [
                {
                    icon: faSyncAlt,
                    onClick: onSync,
                    tooltip: 'refresh',
                },
                {
                    icon: faPlus,
                    onClick: this.addCustomerButtonHandler,
                    tooltip: 'newCustomer',
                },
            ],
        };
    }

    buildItemProps(items) {
        return {
            hoverClass: 'bg-grey-lighter',
            onClick: this.showProductButtonHandler,
            items,
        };
    }

    render() {
        const { items, loading, error } = this.props.products;

        const titleProps = this.buildTitleProps();

        if (error) {
            return (
                <Panel titleProps={titleProps} error={error}/>
            );
        }
        else if (loading) {
            return (
                <Panel titleProps={titleProps} loading={true}/>
            );
        }
        else {
            const productItems = this.buildItems(items);
            const itemsProps = this.buildItemProps(productItems);
            return (
                <Panel titleProps={titleProps} itemsProps={itemsProps}/>
            );
        }
    }

    addProductButtonHandler(event) {
        console.log('add', event);
    }

    showProductButtonHandler(event) {
        console.log('show', event);
    }

    refresh() {
        console.log('refresh');
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

export default connect(mapStateToProps)(ProductsPanel);