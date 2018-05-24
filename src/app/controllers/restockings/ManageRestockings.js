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
    }

    componentWillMount() {
        this.props.dispatch(this.fetchRestockings());
    }

    addFiltersToQuery(query) {
        return query;
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

    fetchRestockings() {
        return async (dispatch) => {
            const { restockings } = this.props;
            let res;

            this.setState({ waypointActive: false });

            if (this.state.reset) {
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
                              restocking={this.state.showRestocking}/>
            </div>
        );
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
            this.props.dispatch(this.fetchRestockings());
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
