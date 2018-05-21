import React from 'react';
import lang from '../../../resources/lang/index';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/fontawesome-free-solid/index';
import classNames from 'classnames';

class ServerState extends React.Component {
    render() {
        let { error } = this.props;

        return (
            <div className="w-1/2 float-right w-1/2 py-3 px-8 border-l-2 border-purple-light text-center text-capitalize">
                <div className="text-grey-light text-sm">
                    {lang('server')}{lang(':')}
                </div>
                <div className={classNames("text-base capitalize",
                                           {
                                               "text-green-light": !error,
                                               "text-red-dark": error,
                                           })}>
                    <FontAwesomeIcon icon={faCircle} size="sm"/> {lang(!error ? 'online' : 'offline')}
                </div>
            </div>
        );
    }
}

export default ServerState;