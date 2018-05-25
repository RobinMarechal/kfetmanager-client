import React from 'react';
import _ from 'lodash';

export default class PanelInfo extends React.Component {
    render() {

        const { info, colorFunction, position } = this.props;

        let color = 'text-grey-darkest';
        if (colorFunction && _.isFunction(colorFunction)) {
            const res = colorFunction(info);
            if (res) {
                color = `text-${res}`;
            }
        }
        else if (position > 0) {
            color = 'text-grey-dark italic text-sm';
        }

        return (
            <p className={"text-overflow-ellipsis overflow-hidden whitespace-no-wrap " + color}>
                {info}
            </p>
        );
    }
}