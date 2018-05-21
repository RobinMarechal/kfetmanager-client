import React from 'react';
import _ from 'lodash';

export default class PanelInfo extends React.Component {
    render() {

        const { info, colorFunction } = this.props;

        let color = '';
        if(colorFunction && _.isFunction(colorFunction)){
            const res = colorFunction(info);
            if(res) {
                color = ` text-${res}`;
            }
        }

        return (
            <p className={"text-overflow-ellipsis overflow-hidden whitespace-no-wrap" + color}>
                {info}
            </p>
        );
    }
}