import React from 'react';
import PanelTitle from './PanelTitle';
import PanelItem from './PanelItem';

export default class Panel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {titleProps, itemsProps} = this.props;
        const {button, title} = titleProps;
        const {items, onClick, hoverClass, colorFunction} = itemsProps;

        return (
            <div className="rounded shadow-md text-grey-darker">
                <PanelTitle button={button} title={title}/>

                {items.map(({left, right, baseData, footer}) => <PanelItem key={`PanelItem_${title}_${baseData.id}`}
                                                                           leftInfo={left}
                                                                           rightInfo={right}
                                                                           baseData={baseData}
                                                                           colorFunction={colorFunction}
                                                                           onClick={onClick}
                                                                           footer={footer}
                                                                           hoverClass={hoverClass}/>)}
            </div>
        );
    }
}