import React from 'react';
import { connect } from 'react-redux';
import lang from '../../../../resources/lang/index';
import { upperFirstLetter } from '../../../../libs/helpers';
import Menu from '../../../models/Menu';
import Category from '../../../models/Category';
import { fetchCategoryBegin, fetchCategoryError } from '../../../actions/models/categories';
import { fetchCategorySuccess } from '../../../actions/models/categories/fetchActions';
import OrderCreationContainer from '../common/OrderCreationContainer';
import OrderCreationTitle from '../common/OrderCreationTitle';
import OrderCreationSearchBar from '../common/OrderCreationSearchBar';
import OrderCreationFooter from '../common/OrderCreationFooter';
import Error from '../../../components/utility/Error';
import ProductListCategoryGroup from './ProductListCategoryGroup';

class ProductList extends React.Component {
    constructor(props) {
        super(props);

        this.handleInputKeyDown = this.handleInputKeyDown.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fetchCategories = this.fetchCategories.bind(this);
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
        const { categories } = this.props;

        if (categories.error) {
            return <Error/>;
        }

        if (categories.items.length === 0) {
            return (
                <div className="px-4 py-2">
                    <p className="pl-6 text-center">
                        -
                    </p>
                </div>
            );
        }

        return categories.items.map((cat) => <ProductListCategoryGroup key={cat.id} category={cat}/>);
    }

    render() {
        const { previous, orderCreation, toggleKeymaps } = this.props;

        return (
            <OrderCreationContainer>
                <div>
                    <OrderCreationTitle
                        previous={previous}
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
}

function mapStateToProps(state) {
    return {
        ...state,
    };
}

export default connect(mapStateToProps)(ProductList);