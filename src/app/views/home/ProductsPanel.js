import React from 'react';
import Panel from '../../ui/reusable/panel/Panel';
import lang, {langFormatDate} from '../../../resources/lang/index';
import {awaitOrEmpty, capitalize, formatNumber, stringPlural} from '../../libs/helpers';
import Customer from '../../models/Customer';
import Product from '../../models/Product';

export default class ProductsPanel extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            products: [],
        };
    }

    async componentWillMount() {
        await this.findProducts();
        this.interval = setInterval(async () => {
            await this.findProducts();
        }, 1000);
    }

    async findProducts() {
        const {maxItems} = this.props;

        const products = await awaitOrEmpty(new Product().orderBy('stock').with('subcategory.category').limit(maxItems).all());

        if (products.length > 0) {
            this.setState({products});
        }
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() {
        const {products} = this.state;
        const title = lang("product", stringPlural, capitalize);


        const items = products.map((product) => {
                return {
                    left: [
                        product.name,
                        product.subcategory.name + ', ' + product.subcategory.category.name,
                    ],
                    right: [
                        product.stock,
                    ],
                    baseData: product,
                };
            },
        );

        const titleProps = {
            title,
            button: {
                onClick: this.addProductButtonHandler,
                tooltip: 'newCustomer',
            },
        };

        const itemsProps = {
            hoverClass: 'bg-grey-lighter',
            onClick: this.showProductButtonHandler,
            items,
        };

        return (
            <Panel titleProps={titleProps} itemsProps={itemsProps}/>
        );
    }

    addProductButtonHandler(event) {
        console.log('add', event);
    }

    showProductButtonHandler(event) {
        console.log('show', event);
    }
}