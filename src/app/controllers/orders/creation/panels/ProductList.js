import React from 'react';
import { connect } from 'react-redux';
import lang from '../../../../../resources/lang/index';
import { upperFirstLetter } from '../../../../../libs/helpers';
import Menu from '../../../../models/Menu';
import Category from '../../../../models/Category';
import { fetchCategoryBegin, fetchCategoryError } from '../../../../actions/models/categories/index';
import { fetchCategorySuccess } from '../../../../actions/models/categories/fetchActions';
import OrderCreationContainer from '../../../../components/orders/orderCreation/common/OrderCreationContainer';
import OrderCreationTitle from '../../../../components/orders/orderCreation/common/OrderCreationTitle';
import OrderCreationSearchBar from '../../../../components/orders/orderCreation/common/OrderCreationSearchBar';
import OrderCreationFooter from '../../../../components/orders/orderCreation/common/OrderCreationFooter';
import Error from '../../../../components/utility/Error';
import ProductListCategoryGroup from '../../../../components/orders/orderCreation/products/ProductListCategoryGroup';
import Product from '../../../../models/Product';
import { bindActionCreators } from 'redux';
import { productClicked } from '../../../../actions/models/products/index';
import OrderCreationBreadcrumb, { BREADCRUMB_PRODUCTS } from '../../../../components/orders/orderCreation/common/OrderCreationBreadcrumb';
import { orderValidated } from '../../../../actions/models/orders/index';
import Order from '../../../../models/Order';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
        this.itemSelectionHandler = this.itemSelectionHandler.bind(this);
    }

    componentDidMount() {
        this.props.dispatch(this.fetchCategories());
    }

    fetchCategories(search = null) {
        return async (dispatch) => {
            dispatch(fetchCategoryBegin());
            try {
                let categories = [];
                const menuId = this.props.orderCreation.menu.id;
                if (menuId) {
                    const menu = await new Menu().with('categories.subcategories.products.subcategory.category').find(menuId);
                    categories = menu.categories;
                }
                else {
                    categories = await new Category().with('subcategories.products').all();
                }

                categories = Category.filterListByProductName(categories, search);

                dispatch(fetchCategorySuccess(categories));
            }
            catch (e) {
                console.log(e);
                dispatch(fetchCategoryError());
                return [];
            }
        };
    }


    buildList() {
        const { categories, orderCreation } = this.props;

        if (categories.error) {
            return <Error/>;
        }

        if (!categories.items || categories.items.length === 0) {
            return (
                <div className="px-4 py-2">
                    <p className="pl-6 text-center">
                        -
                    </p>
                </div>
            );
        }

        return categories.items.map((cat) => <ProductListCategoryGroup key={cat.id}
                                                                       onItemSelect={this.itemSelectionHandler}
                                                                       orderCreation={orderCreation}
                                                                       category={cat}/>);
    }

    render() {
        const { next, previous, orderCreation, toggleKeymaps } = this.props;

        return (
            <OrderCreationContainer>
                <div>
                    <OrderCreationBreadcrumb current={BREADCRUMB_PRODUCTS}/>

                    <OrderCreationTitle
                        previous={previous}
                        next={next}
                        title={lang('productSelection')}
                    />

                    <OrderCreationSearchBar
                        placeholder={lang('searchProduct', upperFirstLetter)}
                        onKeyDown={this.handleInputChange}
                        onChange={this.handleInputChange}
                        onFocus={toggleKeymaps}
                        onBlur={toggleKeymaps}
                    />
                </div>


                <ul className="indent-lg px-0 text-grey-darkest h-auto overflow-y-auto shadow border rounded list-style-none my-4">
                    {this.buildList()}
                </ul>

                <OrderCreationFooter
                    title={lang('selectedProducts', upperFirstLetter)}
                    name={orderCreation.products.map((p) => upperFirstLetter(p.name)).join(', ')}
                />

            </OrderCreationContainer>
        );
    }

    handleInputChange(event) {
        this.props.dispatch(this.fetchCategories(event.target.value));
    }

    handleInputKeyDown(event) {

    }


    async itemSelectionHandler(clickedProduct, category) {
        const { orderCreation, productClicked, orderValidated } = this.props;
        const { menu, products: alreadySelectedProducts, validated } = orderCreation;

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

        const isValid = await Order.isValid(orderCreation);
        if (isValid !== validated) {
            orderValidated(isValid);
        }
    }
}

function mapStateToProps(state) {
    return {
        orderCreation: state.orderCreation,
        productClicked: state.productClicked,
        categories: state.categories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            productClicked,
            orderValidated,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList);