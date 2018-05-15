import React from 'react';
import PanelInfo from './PanelInfo';
import _ from 'lodash';

export default function PanelItem(props) {
    const {rightInfo, leftInfo, colorFunction, hoverClass, onClick, footer} = props;

    const color = colorFunction && _.isFunction(colorFunction) ? "text-" + colorFunction() : '';

    let footerTag = '';
    if (footer && typeof footer === 'string' && footer.length > 0) {
        footerTag = (
            <div>
                <p className="text-grey mt-3 text-sm italic">
                    {footer}
                </p>
            </div>
        );
    }

    return (
        <div
            className={"border-t px-4 py-2" + (hoverClass ? ' hover:' + hoverClass : '')}
            onClick={onClick}>
            <div className={"flex justify-between flex-row" + (_.isFunction(onClick) ? ' cursor-pointer' : '')}>
                <div className="w-3/4 flex justify-around flex-col">
                    {leftInfo.map((info, id) => <PanelInfo key={`PanelLeftInfo_${id}`} info={info}/>)}
                    {footerTag}
                </div>
                <div className={"w-1/4 text-right flex justify-around flex-col" + color}>
                    {rightInfo.map((info, id) => <PanelInfo key={`PanelRightInfo_${id}`} info={info}/>)}
                </div>
            </div>
        </div>
    );
}