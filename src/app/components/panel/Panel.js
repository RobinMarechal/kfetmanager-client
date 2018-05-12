import React from 'react';
import PanelTitle from './PanelTitle';
import PanelItem from './PanelItem';
import Error from '../utility/Error';
import Loading from '../utility/Loading';

export default class Panel extends React.Component {
    renderError() {
        return <Error />
    }

    renderLoading() {
        return <Loading />
    }

    renderItems(itemsProps) {
        const { items, onClick, hoverClass, colorFunction } = itemsProps;

        if (items.length === 0) {
            return (
                <div className="border-t px-4 py-2 text-center">
                    -
                </div>
            );
        }

        return items.map(({ left, right, baseData, footer }) => <PanelItem key={baseData.id}
                                                                           leftInfo={left}
                                                                           rightInfo={right}
                                                                           baseData={baseData}
                                                                           colorFunction={colorFunction}
                                                                           onClick={onClick}
                                                                           footer={footer}
                                                                           hoverClass={hoverClass}/>);
    }

    render() {
        const { titleProps, itemsProps, loading, error } = this.props;
        const { buttons, title } = titleProps;

        let body;

        if (error) {
            body = this.renderError(error);
        }
        else if (loading) {
            body = this.renderLoading();
        }
        else {
            body = this.renderItems(itemsProps);
        }

        return (
            <div className="rounded shadow-md text-grey-darker">
                <PanelTitle buttons={buttons} title={title}/>

                <div className="PanelItems">
                    {body}
                </div>
            </div>
        );
    }
}