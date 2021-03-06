import React from 'react';
import PanelInfo from './PanelInfo';
import _ from 'lodash';

export default function PanelItem(props) {
    const { rightInfo, leftInfo, colorFunction, hoverClass, onClick, footer } = props;

    let footerTag = '';
    if (footer && typeof footer === 'string' && footer.length > 0) {
        footerTag = (
            <div>
                <p className="text-grey mt-1 text-sm italic">
                    {footer}
                </p>
            </div>
        );
    }

    return (
        <div
            className={"first-child-no-border-top border-t px-4 py-2" + (hoverClass ? ' hover:' + hoverClass : '')}
            onClick={onClick}>
            <div className={"flex justify-between flex-row" + (_.isFunction(onClick) ? ' cursor-pointer' : '')}>
                <div className="w-3/4 flex justify-around flex-col leading-normal">
                    {leftInfo.map((info, i) => <PanelInfo key={`PanelLeftInfo_${i}`} position={i} info={info}/>)}
                    {footerTag}
                </div>
                <div className="w-1/4 text-right flex justify-around flex-col">
                    {rightInfo.map((info, id) => <PanelInfo key={`PanelRightInfo_${id}`} info={info} colorFunction={colorFunction}/>)}
                </div>
            </div>
        </div>
    );
}