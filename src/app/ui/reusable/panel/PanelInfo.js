import React from 'react';

export default class PanelInfo extends React.Component{
    render(){

        const { info } = this.props;

        return (
            <p className="text-overflow-ellipsis overflow-hidden whitespace-no-wrap">
                {info}
            </p>
        );
    }
}