import React from 'react';
import ProductListSubcategoryGroup from './ProductListSubcategoryGroup';

class ProductListCategoryGroup extends React.Component {
    render() {
        const { category, onItemSelect, orderCreation } = this.props;
        const { subcategories, name } = category;

        if(!subcategories || subcategories.length === 0){
            return null;
        }

        return (
            <div>
                <li className="first-child-no-border-top px-4 py-2 border-t bg-grey-light">
                    <p className="pl-2 capitalize">{name}</p>
                </li>
                {subcategories.map((sub) => <ProductListSubcategoryGroup category={category}
                                                                         onItemSelect={onItemSelect}
                                                                         key={sub.id}
                                                                         subcategory={sub}
                                                                         orderCreation={orderCreation}
                />)}
            </div>
        );
    }
}

export default ProductListCategoryGroup;