import React from 'react';
import classNames from 'classnames';
import lang from '../../../../../resources/lang/index';

export const BREADCRUMB_CUSTOMER = 0;
export const BREADCRUMB_MENU = 1;
export const BREADCRUMB_PRODUCTS = 2;

export default function OrderCreationBreadcrumb(props) {
    const { current } = props;

    return (
        <div className="mb-3">
            <span className={classNames('capitalize', {
                'text-grey-darker': current === BREADCRUMB_CUSTOMER,
                'text-grey': current !== BREADCRUMB_CUSTOMER,
            })}>
                    {lang('customer')}
                    </span>
            <span className="text-grey-light mx-1 BreadcrumbChevron"> > </span>


            <span className={classNames('capitalize', {
                'text-grey-darker': current === BREADCRUMB_MENU,
                'text-grey': current !== BREADCRUMB_MENU,
            })}>
                    {lang('menu')}
                    </span>

            <span className="text-grey-light mx-1 BreadcrumbChevron"> > </span>

            <span className={classNames('capitalize', {
                'text-grey-darker': current === BREADCRUMB_PRODUCTS,
                'text-grey': current !== BREADCRUMB_PRODUCTS,
            })}>
                    {lang('products')}
                    </span>
        </div>
    );
}