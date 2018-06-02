import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { fetchRestockingBegin, fetchRestockingError, fetchRestockingSuccess } from '../../actions/models/restockings';
import RestockingsTable from '../../components/restockings/RestockingsTable';
import Restocking from '../../models/Restocking';
import AddRestockingButton from '../../components/restockings/AddRestockingButton';
import AddRestockingModal from '../../components/restockings/AddRestockingModal';
import { fetchCategoryBegin, fetchCategoryError } from '../../actions/models/categories';
import { fetchCategorySuccess } from '../../actions/models/categories/fetchActions';
import Category from '../../models/Category';
import Product from '../../models/Product';
import DetailsModal from '../../components/restockings/DetailsModal';
import { fetchTreasurySuccess } from '../../actions/models/treasury/fetchActions';
import { fetchProductBegin, fetchProductError, fetchProductSuccess } from '../../actions/models/products';

class ManageRestockings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            nextPage: 1,
            perPage: 20,

            isCreationModalOpen: false,
            isDetailsModalOpen: false,
            showRestocking: null,
        };

        this.hasFetchedCategories = false;

        this.enterWaypoint = this.enterWaypoint.bind(this);
        this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
        this.closeCreationModal = this.closeCreationModal.bind(this);
        this.addButtonClick = this.addButtonClick.bind(this);
        this.confirm = this.confirm.bind(this);
        this.detachProduct = this.detachProduct.bind(this);
        this.updatePivot = this.updatePivot.bind(this);
        this.updateRestocking = this.updateRestocking.bind(this);
    }

    componentWillMount() {
        this.props.dispatch(this.fetchRestockings());
        this.props.dispatch(this.fetchCategories());
        this.props.dispatch(this.fetchProducts());
    }

    addFiltersToQuery(query) {
        return query;
    }

    fetchProducts() {
        return async (dispatch) => {
            dispatch(fetchProductBegin());

            try {
                const products = await new Product().orderBy('name').all();
                dispatch(fetchProductSuccess(products));
            }
            catch (e) {
                console.error("An error occurred while trying to fetch all products: ", e);
                dispatch(fetchProductError());
            }

        };
    }

    fetchCategories() {
        return async (dispatch) => {
            dispatch(fetchCategoryBegin());
            try {
                const categories = await new Category().with('products').orderBy('name').all();
                dispatch(fetchCategorySuccess(categories));
            }
            catch (e) {
                console.error('An error occurred while trying to fetch all categories: ', e);
                dispatch(fetchCategoryError());
            }
        };
    }

    fetchRestockings(fromWaypoint = false) {
        return async (dispatch) => {
            const { restockings } = this.props;
            let res;

            this.setState({ waypointActive: false });

            if (this.state.reset || !fromWaypoint) {
                this.setState({ reset: false });
                restockings.items = [];
            }

            dispatch(fetchRestockingBegin());

            try {
                let query = new Restocking().orderBy('-created_at').with('products:id,name');
                query = this.addFiltersToQuery(query);
                const fetchedRestockings = await query.paginate(this.state.perPage, this.state.nextPage);

                res = [...restockings.items, ...fetchedRestockings];

                if (fetchedRestockings.length > 0) {
                    this.setState({
                        nextPage: this.state.nextPage + 1,
                    });
                }

                dispatch(fetchRestockingSuccess(res));
            }
            catch (e) {
                console.error("Failed to fetch restockings :");
                console.error(e);
                dispatch(fetchRestockingError());

                res = [];
            }

            this.setState({ waypointActive: true });

            return res;
        };
    }

    render() {
        return (
            <div className="flex m-6 items-start">
                <div className="w-full relative">
                    <RestockingsTable onEnter={this.enterWaypoint} onDoubleClick={this.toggleDetailsModal}/>
                    <AddRestockingButton onClick={this.addButtonClick}/>
                </div>

                <AddRestockingModal isOpen={this.state.isCreationModalOpen}
                                    onConfirm={this.confirm}
                                    onCancel={this.closeCreationModal}
                />

                <DetailsModal isOpen={this.state.isDetailsModalOpen}
                              onClose={this.toggleDetailsModal}
                              restocking={this.state.showRestocking}
                              detachProduct={this.detachProduct}
                              updatePivot={this.updatePivot}
                              updateRestocking={this.updateRestocking}
                />
            </div>
        );
    }

    async updateRestocking(restocking, data) {
        const { restockings } = this.props;

        try {
            let updated = restocking;
            for (const [key, val] of Object.entries(data)) {
                updated[key] = val;
            }

            updated = await updated.with('treasury', 'products:id,name').save();

            const newList = [];
            for (const r of restockings.items) {
                newList.push(r.id === updated.id ? updated : r);
            }

            this.setState({
                restocking: updated,
            });

            this.props.fetchRestockingSuccess(newList);

            return true;
        }
        catch (e) {
            console.error("An error occurred while trying to update a restocking: ", e);
            return false;
        }
    }

    async confirm(restocking, attachments) {
        let { restockings } = this.props;

        try {
            let newRestocking = new Restocking();
            for (const [k, v] of Object.entries(restocking)) {
                newRestocking[k] = v;
            }

            newRestocking = await newRestocking.create();

            const promises = [];
            for (const [pId, quantity] of Object.entries(attachments)) {
                const p = new Product();
                p.id = pId;
                promises.push(newRestocking.attach(p, { quantity }));
            }

            await Promise.all(promises);

            newRestocking = await new Restocking().with('treasury', 'products:id,name').find(newRestocking.id);

            restockings = [newRestocking, ...restockings.items];
            this.props.fetchRestockingSuccess(restockings);

            this.props.fetchTreasurySuccess(newRestocking.treasury);

            this.closeCreationModal();
        }
        catch (e) {
            console.error('An error occurred while trying to create the restocking: ', e);
        }
    }

    async detachProduct(restocking, product) {
        const { restockings } = this.props;

        try {
            const updated = await restocking.with('treasury', 'products:id,name').detach(product);

            this.setState({
                showRestocking: updated,
            });

            const newList = [];
            for (const r of restockings.items) {
                newList.push(r.id === updated.id ? updated : r);
            }

            this.props.fetchRestockingSuccess(newList);

            return true;
        }
        catch (e) {
            console.log('An error occurred while trying to detach a product from a restocking: ', e);
            return false;
        }
    }

    async updatePivot(restocking, product, newProductId, data) {
        const { restockings } = this.props;

        try {
            // If it's a creation, we won't detach anything
            if (product) {
                await restocking.detach(product);
            }
            const newProduct = new Product();
            newProduct.id = newProductId;

            const updated = await restocking.with('treasury', 'products:id,name').attach(newProduct, data);

            this.setState({
                showRestocking: updated,
            });

            const newList = [];
            for (const r of restockings.items) {
                newList.push(r.id === updated.id ? updated : r);
            }

            this.props.fetchRestockingSuccess(newList);

            return true;
        }
        catch (e) {
            console.error('An error occurred while trying to detach a product from a restocking: ', e);
            return false;
        }
    }

    toggleDetailsModal(restocking = null) {
        this.setState({
            isDetailsModalOpen: !this.state.isDetailsModalOpen,
            showRestocking: restocking,
        });
    }

    closeCreationModal() {
        this.setState({
            isCreationModalOpen: false,
        });
    }

    addButtonClick() {
        if (!this.hasFetchedCategories) {
            this.props.dispatch(this.fetchCategories());
            this.hasFetchedCategories = true;
        }

        this.setState({
            isCreationModalOpen: true,
        });
    }

    enterWaypoint() {
        if (this.state.waypointActive) {
            this.props.dispatch(this.fetchRestockings(true));
            this.setState({
                waypointActive: true,
            });
        }
    }
}

function mapStateToProps(state) {
    return {
        restockings: state.restockings,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            fetchRestockingSuccess,
            fetchTreasurySuccess,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageRestockings);
