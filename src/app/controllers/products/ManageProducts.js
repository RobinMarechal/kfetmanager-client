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
import DeleteProductModal from '../../components/products/manage/modals/DeleteProductModal';
import EditProductModal from '../../components/products/manage/modals/EditProductModal';
import { fetchCategoryBegin, fetchCategoryError } from '../../actions/models/categories';
import { fetchCategorySuccess } from '../../actions/models/categories/fetchActions';
import { fetchSubcategoryBegin, fetchSubcategoryError } from '../../actions/models/subcategories';
import { fetchSubcategorySuccess } from '../../actions/models/subcategories/fetchActions';
import CreateCategoryModal from '../../components/products/manage/modals/CreateCategoryModal';
import CreateSubcategoryModal from '../../components/products/manage/modals/CreateSubcategoryModal';

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
            },
            selectedProduct: null,
            reset: true,
            waypointActive: true,
            deleteModalIsOpen: false,
            editProductModalIsOpen: false,
            createCategoryModalIsOpen: false,
            createSubcategoryModalIsOpen: false,
        };


        this.hasFetchedCategories = false;
        this.hasFetchedSubcategories = false;

        this.fetchProducts = this.fetchProducts.bind(this);

        this.onSubcategoryClick = this.onSubcategoryClick.bind(this);
        this.onCategoryClick = this.onCategoryClick.bind(this);

        this.onSort = this.onSort.bind(this);
        this.onSearch = this.onSearch.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDoubleClick = this.onDoubleClick.bind(this);
        this.onSuppr = this.onSuppr.bind(this);

        this.onOpenEditProductModal = this.onOpenEditProductModal.bind(this);
        this.onOpenDeleteModal = this.onOpenDeleteModal.bind(this);
        this.onOpenCreateProductModal = this.onOpenCreateProductModal.bind(this);
        this.openCreateSubcategoryModal = this.openCreateSubcategoryModal.bind(this);
        this.openCreateCategoryModal = this.openCreateCategoryModal.bind(this);

        this.closeDeleteModal = this.closeDeleteModal.bind(this);

        this.onConfirmDeletion = this.onConfirmDeletion.bind(this);
        this.onConfirmEdition = this.onConfirmEdition.bind(this);
        this.onCancelEdition = this.onCancelEdition.bind(this);
        this.onConfirmCategoryCreation = this.onConfirmCategoryCreation.bind(this);
        this.onCancelCategoryCreation = this.onCancelCategoryCreation.bind(this);

        this.onConfirmSubcategoryCreation = this.onConfirmSubcategoryCreation.bind(this);
        this.onCancelSubcategoryCreation = this.onCancelSubcategoryCreation.bind(this);
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

    fetchCategories() {
        return async (dispatch) => {
            try {
                dispatch(fetchCategoryBegin());

                const categories = await new Category().orderBy('name').all();

                dispatch(fetchCategorySuccess(categories));

            } catch (e) {
                console.error('Failed to fetch categories: ', e);
                dispatch(fetchCategoryError());
            }
        };
    }

    fetchSubcategories() {
        return async (dispatch) => {
            try {
                dispatch(fetchSubcategoryBegin());

                const subcategories = await new Subcategory().orderBy('name').with('category:id,name').all();

                dispatch(fetchSubcategorySuccess(subcategories));

            } catch (e) {
                console.error('Failed to fetch subcategories: ', e);
                dispatch(fetchSubcategoryError());
            }
        };
    }

    render() {
        return (
            <div className="flex m-6 items-start">
                <div className="w-3/4 shadow rounded mr-3">
                    <ProductsTable selected={this.state.selectedProduct}
                                   onSuppr={this.onSuppr}
                                   onSelect={this.onSelect}
                                   onDoubleClick={this.onDoubleClick}
                                   orderBy={this.state.controls.orderBy}
                                   orderDirection={this.state.controls.orderDirection}
                                   onCategoryClick={this.onCategoryClick}
                                   onSubcategoryClick={this.onSubcategoryClick}
                                   onSort={this.onSort}/>
                </div>
                <div className="w-1/4 shadow rounded ml-3 pb-2">
                    <ManageProductsControls onSearch={this.onSearch}
                                            controls={this.state.controls}
                                            selected={this.state.selectedProduct}
                                            years={Object.values(Customer.YEARS)}
                                            departments={Object.values(Customer.DEPARTMENTS)}
                                            onEdit={this.onOpenEditProductModal}
                                            onDelete={this.onOpenDeleteModal}
                                            onAddProduct={this.onOpenCreateProductModal}
                                            onAddSubcategory={this.openCreateSubcategoryModal}
                                            onAddCategory={this.openCreateCategoryModal}
                    />
                </div>

                <DeleteProductModal product={this.state.selectedProduct}
                                    isOpen={this.state.deleteModalIsOpen}
                                    onConfirm={this.onConfirmDeletion}
                                    onCancel={this.closeDeleteModal}/>

                <EditProductModal product={this.state.selectedProduct}
                                  isOpen={this.state.editProductModalIsOpen}
                                  onConfirm={this.onConfirmEdition}
                                  onCancel={this.onCancelEdition}/>

                <CreateCategoryModal isOpen={this.state.createCategoryModalIsOpen}
                                     onConfirm={this.onConfirmCategoryCreation}
                                     onCancel={this.onCancelCategoryCreation}/>

                <CreateSubcategoryModal isOpen={this.state.createSubcategoryModalIsOpen}
                                        onConfirm={this.onConfirmSubcategoryCreation}
                                        onCancel={this.onCancelSubcategoryCreation}/>


            </div>
        );
    }

    async onConfirmEdition(data, product) {
        try {
            const pId = product ? product.id : null;
            product = product ? product : new Product();

            for (const [key, value] of Object.entries(data)) {
                product[key] = value;
            }

            product = await product.with('subcategory.category', 'orders').save();
            product.orders = [];

            let products;

            if (pId) {
                for (let i = 0; i < this.props.products.items.length; i++) {
                    if (this.props.products.items[i].id === pId) {
                        this.props.products.items[i] = product;
                        break;
                    }
                }
                products = this.props.products.items;
            } else {
                products = [...this.props.products.items, product];
            }

            products = this.sortProducts(this.state.controls.orderBy, this.state.controls.orderDirection, products);

            this.props.fetchProductSuccess(products);
        }
        catch (e) {
            console.error('Error while trying to create/edit the product: ', e);
        }

        this.setState({
            editProductModalIsOpen: false,
        });
    }

    onCancelEdition() {
        this.setState({
            editProductModalIsOpen: false,
        });
    }


    async onConfirmDeletion() {
        const product = this.state.selectedProduct;

        try {
            this.closeDeleteModal();
            this.onSelect(null);

            await product.delete();

            const updatedList = Product.removeProductFromList(this.props.products.items, product);
            this.props.fetchProductSuccess(updatedList);
        }
        catch (e) {
            console.error('An error occurred while trying to delete the product: ', e);
        }
    }

    closeDeleteModal() {
        this.setState({
            deleteModalIsOpen: false,
        });
    }

    onSuppr() {
        if (!this.state.selectedProduct)
            return;

        this.onOpenDeleteModal();
    }

    onOpenDeleteModal() {
        if (this.state.selectedProduct) {
            this.setState({
                deleteModalIsOpen: true,
            });
        }
    }

    openProductEditModal() {
        this.setState({
            editProductModalIsOpen: true,
        });
    }

    onOpenEditProductModal() {
        if (!this.state.selectedProduct)
            return;

        this.openProductEditModal();
    }

    onOpenCreateProductModal() {
        if (!this.hasFetchedSubcategories) {
            this.props.dispatch(this.fetchSubcategories());
            this.hasFetchedSubcategories = true;
        }

        this.setState({
            selectedProduct: null,
        }, () => this.openProductEditModal());
    }

    onDoubleClick(product) {
        this.setState({
            selectedProduct: product,
        }, () => this.onOpenEditProductModal());
    }


    onSelect(product) {
        const { selectedProduct } = this.state;
        let toSelect = product;
        // If nothing was selected OR we're selecting another one

        if (product && selectedProduct && selectedProduct.id === product.id) {
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

    sortProducts(orderBy, orderDirection, products) {
        return Product.sortCustomersListBy(products, orderBy, orderDirection === '-');
    }

    onSort(orderBy) {
        const { controls } = this.state;
        let products = this.props.products.items;

        let orderDirection = '';

        if (controls.orderBy === orderBy) {
            // noinspection JSValidateTypes
            orderDirection = controls.orderDirection === '-' ? '' : '-';
        }

        // The client-side processing will always be faster since the number of products will remain relatively low.
        // This is why we disabled the infinite scroll, which is not a problem for the same reason
        // However, since the server is distant, the request might eventually take few seconds
        products = this.sortProducts(orderBy, orderDirection, products);

        this.setState({
            controls: {
                ...this.state.controls,
                orderBy,
                orderDirection,
            },
            reset: true,
        });

        this.props.fetchProductSuccess(products);
    }

    // -------------------------------
    // SUBCATEGORY
    // -------------------------------

    onSubcategoryClick(subcategory) {
        // noinspection JSIgnoredPromiseFromCall
        this.onCategoryClick(subcategory, Subcategory);
    }

    openCreateSubcategoryModal() {
        if (!this.hasFetchedCategories) {
            this.props.dispatch(this.fetchCategories());
            this.hasFetchedCategories = true;
        }

        this.setState({
            createSubcategoryModalIsOpen: true,
        });
    }

    async onConfirmSubcategoryCreation(data) {
        const { subcategories } = this.props;
        try {
            let subcategory = new Subcategory();
            for (const [key, val] of Object.entries(data)) {
                subcategory[key] = val;
            }

            subcategory = await subcategory.create();

            this.props.fetchSubcategorySuccess([...subcategories.items, subcategory]);

            this.onCancelSubcategoryCreation();

        } catch (e) {
            console.error('An error occurred while trying to create the subcategory: ', e);
        }
    }

    onCancelSubcategoryCreation() {
        this.setState({
            createSubcategoryModalIsOpen: false,
        });
    }

    // -------------------------------
    // CATEGORY
    // -------------------------------

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

    openCreateCategoryModal() {
        if (!this.hasFetchedCategories) {
            this.props.dispatch(this.fetchCategories());
            this.hasFetchedCategories = true;
        }

        this.setState({
            createCategoryModalIsOpen: true,
        });
    }

    async onConfirmCategoryCreation(data) {
        const { categories } = this.props;
        try {
            let category = new Category();
            for (const [key, val] of Object.entries(data)) {
                category[key] = val;
            }

            category = await category.create();

            this.props.fetchCategorySuccess([...categories.items, category]);

            this.onCancelCategoryCreation();

        } catch (e) {
            console.error('An error occurred while trying to create the category: ', e);
        }
    }

    onCancelCategoryCreation() {
        this.setState({
            createCategoryModalIsOpen: false,
        });
    }

    // -------------------------------
    // RELOAD
    // -------------------------------

    reload() {
        this.props.dispatch(this.fetchProducts());
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
        categories: state.categories,
        subcategories: state.subcategories,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            fetchProductSuccess,
            fetchProductBegin,
            fetchProductError,

            fetchCategorySuccess,
            fetchCategoryBegin,
            fetchCategoryError,

            fetchSubcategorySuccess,
            fetchSubcategoryBegin,
            fetchSubcategoryError,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageProducts);