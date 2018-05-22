import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchProductBegin, fetchProductError, fetchProductSuccess } from '../../actions/models/products';
import Product from '../../models/Product';
import Customer from '../../models/Customer';
import ProductsTable from '../../components/products/manage/ProductsTable';
import ManageProductsControls from '../../components/products/manage/ManageProductsControls';
import Category from '../../models/Category';
import Subcategory from '../../models/Subcategory';

class ManageProducts extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            controls: {
                perPage: 9999,
                nextPage: 1,
                category: null,
                subcategory: null,
                search: null,
                lessThan: null,
                moreThan: null,
                of: null,
                ofId: null,
                orderBy: 'name',
                orderDirection: '',
                search: null,
            },
            selectedProduct: null,
            reset: true,
            waypointActive: true,
        };

        this.fetchProducts = this.fetchProducts.bind(this);

        this.onSubcategoryClick = this.onSubcategoryClick.bind(this);
        this.onCategoryClick = this.onCategoryClick.bind(this);

        this.onSort = this.onSort.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSelect = this.onSelect.bind(this);

        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAddProduct = this.onAddProduct.bind(this);
        this.onAddSubcategory = this.onAddSubcategory.bind(this);
        this.onAddCategory = this.onAddCategory.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(this.fetchProducts());
    }

    addFiltersToQuery(query) {
        const { orderBy, orderDirection, search } = this.state.controls;

        if (orderBy === 'name' || orderBy === 'price') {
            query.orderBy(orderDirection + orderBy);
        }

        if (search && search !== '') {
            query.where('name', 'LIKE', `%${search}%`);
        }
    }

    fetchProducts() {
        return async (dispatch) => {
            const { products } = this.props;
            let res;

            this.setState({ waypointActive: false });

            if (this.state.reset) {
                this.setState({
                    reset: false,
                    controls: {
                        ...this.state.controls,
                        nextPage: 1,
                    },
                });
                products.items = [];
            }

            dispatch(fetchProductBegin());

            try {
                let query = new Product();
                if (this.state.controls.of && this.state.controls.ofId) {
                    query.of(this.state.controls.of, this.state.controls.ofId);
                }
                query.with('subcategory.category', 'orders:id');
                this.addFiltersToQuery(query);

                const fetchedProducts = await query.paginate(this.state.controls.perPage, this.state.controls.nextPage);

                res = [...products.items, ...fetchedProducts];

                if (fetchedProducts.length > 0) {
                    this.setState({
                        controls: {
                            ...this.state.controls,
                            nextPage: this.state.controls.nextPage + 1,
                        },
                    });
                }

                dispatch(fetchProductSuccess(res));
            }
            catch (e) {
                console.error("Failed to fetch products :");
                console.error(e);
                dispatch(fetchProductError());

                res = [];
            }

            this.setState({ waypointActive: true });

            return res;
        };
    }

    render() {
        return (
            <div className="flex m-6">
                <div className="w-3/4 shadow rounded mr-3">
                    <ProductsTable selected={this.state.selectedProduct}
                                   onSelect={this.onSelect}
                                   orderBy={this.state.controls.orderBy}
                                   orderDirection={this.state.controls.orderDirection}
                                   onCategoryClick={this.onCategoryClick}
                                   onSubcategoryClick={this.onSubcategoryClick}
                                   onSort={this.onSort}/>
                </div>
                <div className="w-1/4 shadow rounded ml-3">
                    <ManageProductsControls onSearch={this.onSearch}
                                            controls={this.state.controls}
                                            selected={this.state.selectedProduct}
                                            years={Object.values(Customer.YEARS)}
                                            departments={Object.values(Customer.DEPARTMENTS)}
                                            onEdit={this.onEdit}
                                            onDelete={this.onDelete}
                                            onAddProduct={this.onAddProduct}
                                            onAddSubcategory={this.onAddSubcategory}
                                            onAddCategory={this.onAddCategory}
                    />
                </div>
            </div>
        );
    }

    onEdit(){

    }

    onDelete(){

    }

    onAddProduct(){

    }

    onAddSubcategory(){

    }

    onAddCategory(){

    }


    onSelect(product) {
        const { selectedProduct } = this.state;
        let toSelect = product;
        // If nothing was selected OR we're selecting another one

        if (selectedProduct && selectedProduct.id === product.id) {
            toSelect = null;
        }

        this.setState({
            selectedProduct: toSelect,
        });
    }

    async onSearch(event) {
        const search = event.target.value;
        await this.setState({
            controls: {
                ...this.state.controls,
                search,
            },
            reset: true,
        });
        this.reload();
    }

    async onSort(orderBy) {
        const { controls } = this.state;

        let orderDirection = '';

        if (controls.orderBy === orderBy) {
            // noinspection JSValidateTypes
            orderDirection = controls.orderDirection === '-' ? '' : '-';
        }

        // The client-side processing will always be faster since the number of products will remain relatively low.
        // This is why we disabled the infinite scroll, which is not a problem for the same reason
        // However, since the server is distant, the request might eventually take few seconds
        Product.sortCustomersListBy(this.props.products.items, orderBy, orderDirection === '-');
        this.setState({
            controls: {
                ...controls,
                orderBy,
                orderDirection,
            },
            reset: true,
        });

        this.props.fetchProductSuccess(this.props.products.items);
    }

    async onCategoryClick(category, clazz = Category) {
        let of = null;
        let ofId = null;

        if (this.state.controls.of !== clazz && this.state.controls.ofId !== category.id) {
            of = clazz;
            ofId = category.id;
        }

        await this.setState({
            controls: {
                ...this.state.controls,
                of,
                ofId,
            },
            reset: true,
        });
        this.reload();
    }

    onSubcategoryClick(subcategory) {
        // noinspection JSIgnoredPromiseFromCall
        this.onCategoryClick(subcategory, Subcategory);
    }

    reload() {
        this.props.dispatch(this.fetchProducts());
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            fetchProductSuccess,
            fetchProductBegin,
            fetchProductError,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);