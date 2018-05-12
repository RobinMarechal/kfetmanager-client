import React from 'react';
import lang from '../../../resources/lang';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/fontawesome-free-solid/index';
import { connect } from 'react-redux';

class ServerState extends React.Component {
    render() {
        let { treasury } = this.props.treasury;
        let status = false;
        if(treasury && treasury.id){
            status = true;
        }

        return (
            <div className="float-right w-1/2 py-3 px-8 border-l-2 border-purple-light text-center text-capitalize">
                <div className="text-grey-light text-sm">
                    {lang('server')}{lang(':')}
                </div>
                <div className={"capitalize text-base text-" + (status ? "green-light" : "red-dark")}>
                    <FontAwesomeIcon icon={faCircle} size="sm"/> {lang(status ? 'online' : 'offline')}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    return {
        ...state
    }
}

export default connect(mapStateToProps)(ServerState);