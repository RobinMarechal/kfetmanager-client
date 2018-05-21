import React from 'react';
import { bindActionCreators } from 'redux';
import { fetchOrderBegin, fetchOrderError, fetchOrderSuccess } from '../../../actions/models/orders';
import Order from '../../../models/Order';
import { connect } from 'react-redux';
import OrdersTable from '../../../components/orders/orderHistory/OrdersTable';
import { clearReducers } from '../../../actions/clearReducers';
import OrderHistoryControls from '../../../components/orders/orderHistory/OrderHistoryControls';

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controls: {
                nextPage: 1,
                perPage: 10,
            },
            reset: true,
            waypointActive: true,
        };

        this.fetchOrders = this.fetchOrders.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
    }

    componentWillMount() {
        this.props.clearReducers();
    }

    fetchOrders() {
        return async (dispatch) => {
            const { orders } = this.props;
            let res;

            this.setState({ waypointActive: false });

            if (this.state.reset) {
                this.setState({ reset: false });
                dispatch(fetchOrderSuccess([]));
            }

            dispatch(fetchOrderBegin());

            try {
                const fetchedOrders = await new Order().with('customer:id,name', 'menu:id,name', 'products:id,name', 'treasury')
                                                       .orderBy('-id')
                                                       .paginate(this.state.controls.perPage, this.state.controls.nextPage);

                res = [...orders.items, ...fetchedOrders];

                this.setState({
                    controls: {
                        ...this.state.controls,
                        nextPage: this.state.controls.nextPage + 1,
                    },
                });

                dispatch(fetchOrderSuccess(res));
            }
            catch (e) {
                console.error("Failed to fetch orders :");
                console.error(e);
                dispatch(fetchOrderError());

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
                    <OrdersTable onEnter={this.handleEnter} onLeave={this.handleLeave}/>
                </div>
                <div className="w-1/4 shadow rounded ml-3">
                    <OrderHistoryControls controls={this.state.controls}/>
                </div>
            </div>
        );
    }

    handleEnter() {
        if (this.state.waypointActive) {
            this.props.dispatch(this.fetchOrders());
            this.setState({
                inWaypoint: true,
            });
        }
    }
}

function mapStateToProps(state) {
    return {
        orders: state.orders,
    };
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            clearReducers,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);