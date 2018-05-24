import React from 'react';
import { bindActionCreators } from 'redux';
import { clearOrders, fetchOrderBegin, fetchOrderError, fetchOrderSuccess } from '../../../actions/models/orders';
import Order from '../../../models/Order';
import { connect } from 'react-redux';
import OrdersTable from '../../../components/orders/orderHistory/OrdersTable';
import OrderHistoryControls from '../../../components/orders/orderHistory/OrderHistoryControls';
import Customer from '../../../models/Customer';

class OrderHistory extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            controls: {
                nextPage: 1,
                perPage: 20,
                department: null,
                year: null,
                atDate: null,
                fromDate: null,
                fromTime: null,
                toDate: null,
                toTime: null,
                lessThan: 0,
                moreThan: 0,
                orderBy: '-id',
            },
            reset: true,
            waypointActive: true,
        };

        this.fetchOrders = this.fetchOrders.bind(this);
        this.handleEnter = this.handleEnter.bind(this);
        this.onControlChange = this.onControlChange.bind(this);
    }

    componentWillMount() {
        this.props.clearOrders();
    }

    addFiltersToQuery(query) {
        const { atDate, fromDate, fromTime, toDate, toTime, lessThan, moreThan, orderBy } = this.state.controls;

        // From
        if (atDate) {
            query.where('created_at', '>=', atDate).where('created_at', '<=', `${atDate} 23:59:99`);
        }

        if (fromDate) {
            let from = [];
            from.push(fromDate);
            if (fromTime) {
                from.push(fromTime);
            }
            if (from.length > 0) {
                from = from.join(' ');
                query.from(from);
            }
        }
        else if (fromTime) {
            query.fromTime(fromTime);
        }

        // To
        if (toDate) {
            let to = [];
            to.push(toDate);
            if (toTime) {
                to.push(toTime);
            }
            if (to.length > 0) {
                to = to.join(' ');
                query.to(to);
            }
        }
        else if (toTime) {
            query.toTime(toTime);
        }

        // lessThan
        if (lessThan) {
            query.where('final_price', '<=', lessThan);
        }

        // moreThan
        if (moreThan !== null) {
            query.where('final_price', '>=', moreThan);
        }

        // orderBy
        if (!orderBy) {
            query.orderBy('-id');
        }
        else {
            query.orderBy(orderBy);
        }

        return query;
    }

    fetchOrders() {
        return async (dispatch) => {
            const { orders } = this.props;
            let res;

            this.setState({ waypointActive: false });

            if (this.state.reset) {
                this.setState({ reset: false });
                orders.items = [];
            }

            dispatch(fetchOrderBegin());

            try {
                let query = new Order().with('customer:id,name', 'menu:id,name', 'products:id,name', 'treasury');
                query = this.addFiltersToQuery(query);
                const fetchedOrders = await query.paginate(this.state.controls.perPage, this.state.controls.nextPage);

                res = [...orders.items, ...fetchedOrders];

                if (fetchedOrders.length > 0) {
                    this.setState({
                        controls: {
                            ...this.state.controls,
                            nextPage: this.state.controls.nextPage + 1,
                        },
                    });
                }

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
            <div className="flex m-6 items-start">
                <div className="w-3/4 shadow rounded mr-3">
                    <OrdersTable onEnter={this.handleEnter}/>
                </div>
                <div className="w-1/4 shadow rounded ml-3">
                    <OrderHistoryControls onControlChange={this.onControlChange}
                                          controls={this.state.controls}
                                          years={Object.values(Customer.YEARS)}
                                          departments={Object.values(Customer.DEPARTMENTS)}
                    />
                </div>
            </div>
        );
    }

    handleEnter() {
        if (this.state.waypointActive) {
            this.props.dispatch(this.fetchOrders());
            this.setState({
                waypointActive: true,
            });
        }
    }

    async onControlChange(event) {
        const name = event.target.name;
        let value = event.target.value;

        if (!value || value === '' || value === '*' || (name === 'lessThan' && value === '0')) {
            value = null;
        }
        else if (isNaN(parseFloat(value))) {
            value = 0;
        }

        if (this.state.controls[name] === value) {
            return;
        }

        await this.setState({
            controls: {
                ...this.state.controls,
                [name]: value,
                nextPage: 1,
            },
            reset: true,
        });

        this.props.dispatch(this.fetchOrders());
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
            clearOrders,
        }, dispatch),
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(OrderHistory);