import React from 'react';
import lang from '../../../resources/lang/index';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCopyright } from '@fortawesome/fontawesome-free-regular/index';
import { upperFirstLetter } from '../../../libs/helpers';
import { Link } from 'react-router-dom';
import ParametersModal from '../parameters/ParametersModal';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateParameters } from '../../actions/parametersActions';
import Config from '../../../libs/Config';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isParamModalOpen: false,
        };

        this.toggleParamsModal = this.toggleParamsModal.bind(this);
        this.save = this.save.bind(this);
    }

    render() {
        return (
            <div>
                <nav
                    className="text-center flex items-center justify-between flex-wrap px-6 bg-purple-darker text-grey fixed pin-b w-full h-12">
                    <div className="w-1/3">
                        <Link className="text-grey hover:text-grey-light no-underline hover:underline mx-3" to="/">
                            {upperFirstLetter(lang('home'))}
                        </Link>
                        -
                        <button className="text-grey hover:text-grey-light no-underline hover:underline mx-3" onClick={this.toggleParamsModal}>
                            {lang('parameters', upperFirstLetter)}
                        </button>

                    </div>
                    <div className="w-1/3"> - KfetManager -</div>
                    <div className="w-1/3">
                        <FontAwesomeIcon icon={faCopyright} size="sm"/> <a target="_BLANK"
                                                                           rel="noopener noreferrer"
                                                                           className="text-grey hover:text-grey-light no-underline hover:underline"
                                                                           href="https://www.linkedin.com/in/RobinMarechal/">Robin Maréchal</a>
                    </div>
                </nav>

                <ParametersModal isOpen={this.state.isParamModalOpen} onSave={this.save} onClose={this.toggleParamsModal}/>
            </div>
        );
    }

    toggleParamsModal() {
        this.setState({
            isParamModalOpen: !this.state.isParamModalOpen,
        });
    }

    save(configs) {
        const current = Config.all();

        current.server.base_url = configs.url;
        current.app.customers.criticalBalance = configs.customersCriticalBalance;
        current.app.serverCheckInterval = configs.intervalTimer;
        current.app.lang = configs.lang;
        current.app.products.criticalStock = configs.productsCriticalStock;

        Config.set('app', current.app);
        Config.set('server', current.server);

        Config.save();

        this.props.updateParameters(current);

        this.toggleParamsModal();
    }
}

function mapDispatchToProps(dispatch) {
    return {
        dispatch,
        ...bindActionCreators({
            updateParameters,
        }, dispatch),
    };
}

export default connect(null, mapDispatchToProps)(Footer);