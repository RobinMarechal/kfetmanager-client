import React from 'react';
import ProductListSubcategoryGroup from './ProductListSubcategoryGroup';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { productClicked } from '../../../actions/models/products';
import Category from '../../../models/Category';
import Product from '../../../models/Product';

class ProductListCategoryGroup extends React.Component {

    constructor(props) {
        super(props);

        this.itemSelectionHandler = this.itemSelectionHandler.bind(this);
    }

    render() {
        const { category } = this.props;
        const { subcategories, name } = category;

        return (
            <div>
                <li className="first-child-no-border-top px-4 py-2 border-t bg-grey-light">
                    <p className="pl-2 capitalize">{name}</p>
                </li>
                {subcategories.map((sub) => <ProductListSubcategoryGroup category={category} key={sub.id} subcategory={sub}
                                                                         onItemSelect={this.itemSelectionHandler}/>)}
            </div>
        );
    }

    async itemSelectionHandler(clickedProduct, category) {
        const { orderCreation, productClicked } = this.props;
        const { menu, products: alreadySelectedProducts } = orderCreation;

        if (alreadySelectedProducts.length === 0 || alreadySelectedProducts.map(p => p.id).includes(clickedProduct.id)) {
            // Deselection or first selection: nothing to check
            productClicked(clickedProduct);
        }
        else {
            try {
                // If a menu was selected: restrict the selection to one per category
                if (menu && menu.id) {
                    const menuCategories = await menu.lazyLoadAndGet('categories');

                    // If the menu allows this category
                    if (menuCategories.map(({ id }) => id).includes(category.id)) {
                        let selectedProductInCat = null;

                        // Look if the clickedProduct is of same category as an alreadySelectedProduct
                        const productCategory = await new Category().of(Product, clickedProduct.id).find();
                        for (const p of alreadySelectedProducts) {
                            const cat = await new Category().of(Product, p.id).find();
                            if (cat.id === productCategory.id) {
                                // The user has already selected a product of this category -> we can stop
                                selectedProductInCat = p;
                                break;
                            }
                        }

                        // If no product of this category was already selected, we select the clicked product
                        if (selectedProductInCat) {
                            productClicked(selectedProductInCat);
                        }
                        productClicked(clickedProduct);
                    }
                    // Else: don't select it
                }
                else {
                    // Not in a menu, can order as many item as he want
                    productClicked(clickedProduct);
                }
            }
            catch (e) {
                console.error('An error occurred during the alreadySelectedProducts selection:');
                console.error(e);
            }
        }
    }
}

function mapStateToProps(state) {
    return {
        orderCreation: state.orderCreation,
    };
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({
        productClicked: productClicked,
    }, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(ProductListCategoryGroup);