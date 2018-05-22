import React from 'react';
import lang from '../../../../resources/lang';
import { upperFirstLetter } from '../../../../libs/helpers';
import Help from '../../utility/Help';

const FIELD_HEIGHT = '36px';

export default function OrderHistoryControls(props) {
    const { onControlChange } = props;

    return (
        <div className="text-grey-darkest p-4">
            {/*<h1 className="text-center">{lang('filters', upperFirstLetter)}</h1>*/}

            <h4>
                {lang('atDate', upperFirstLetter)}{lang(':')}
                <Help tooltip={lang('helpOrderHistoryDateField')}/>
            </h4>
            <input
                name="atDate"
                onChange={onControlChange}
                style={{ height: FIELD_HEIGHT }}
                className="my-2 appearance-none border rounded pl-4 py-2 w-full"
                type="date"
            />

            <hr className="border-t w-full my-6"/>

            <div className="flex mb-4">
                <div className="pr-2 w-1/2">
                    <h4>
                        {lang('from', upperFirstLetter)}{lang(':')}
                        <Help tooltip={lang('helpOrderHistoryDateAndTime')}/>
                    </h4>
                    <input
                        name="fromDate"
                        onChange={onControlChange}
                        style={{ height: FIELD_HEIGHT }}
                        className="my-2 appearance-none border rounded pl-4 py-2 w-full"
                        type="date"
                    />
                    <input
                        name="fromTime"
                        onChange={onControlChange}
                        style={{ height: FIELD_HEIGHT }}
                        className="appearance-none border rounded pl-4 py-2 w-full"
                        type="time"
                    />
                </div>

                <div className="pl-2 w-1/2">
                    <h4>{lang('to', upperFirstLetter)}{lang(':')}</h4>
                    <input
                        name="toDate"
                        onChange={onControlChange}
                        style={{ height: FIELD_HEIGHT }}
                        className="my-2 appearance-none border rounded pl-4 py-2 w-full"
                        type="date"
                    />
                    <input
                        name="toTime"
                        onChange={onControlChange}
                        style={{ height: FIELD_HEIGHT }}
                        className="appearance-none border rounded pl-4 py-2 w-full"
                        type="time"
                    />
                </div>

            </div>

            <hr className="border-t w-full my-6"/>

            <h4>
                {lang('lessThan', upperFirstLetter)}{lang(':')}
                <Help tooltip={lang('helpOrderHistoryLessThan')}/>
            </h4>
            <input
                name="lessThan"
                onChange={onControlChange}
                style={{ height: FIELD_HEIGHT }}
                className="my-2 appearance-none border rounded pl-4 py-2 w-full mb-4"
                type="number"
                defaultValue="0"
            />


            <h4>{lang('moreThan', upperFirstLetter)}{lang(':')}</h4>
            <input
                name="moreThan"
                onChange={onControlChange}
                style={{ height: FIELD_HEIGHT }}
                className="my-2 appearance-none border rounded pl-4 py-2 w-full"
                type="number"
                defaultValue="0"
            />
        </div>
    );
}