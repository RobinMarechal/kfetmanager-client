import React from 'react';
import Modal from 'react-modal';
import langFunction from '../../../resources/lang';
import { isNumberValid, upperFirstLetter } from '../../../libs/helpers';
import Separator from '../utility/Separator';
import FlexDiv from '../utility/FlexDiv';
import Button from '../utility/Button';
import classNames from 'classnames';
import Select from '../forms/Select';
import { connect } from 'react-redux';

const style = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const AVAILABLE_LANGS = {
    en: 'english',
    fr: 'french',
};

class ParametersModal extends React.Component {
    constructor(props) {
        super(props);

        const configs = this.props.parameters;

        this.state = {
            url: configs.server.base_url,
            intervalTimer: configs.app.serverCheckInterval,
            lang: configs.app.lang,
            productsCriticalStock: configs.app.products.criticalStock,
            customersCriticalBalance: configs.app.customers.criticalBalance,

            urlInvalid: false,
            langInvalid: false,
            intervalTimerInvalid: false,
            productsCriticalStockInvalid: false,
            customersCriticalBalanceInvalid: false,
        };

        this.saveMiddleware = this.saveMiddleware.bind(this);
        this.change = this.change.bind(this);
    }

    buildForm() {
        const { url, intervalTimer, customersCriticalBalance, productsCriticalStock, lang } = this.state;
        const { intervalTimerInvalid, customersCriticalBalanceInvalid, productsCriticalStockInvalid, urlInvalid, langInvalid } = this.state;

        return (
            <div>

                <TextInput name="url"
                           type="text"
                           labelText="server URL"
                           placeholder="Ex: http://www.server.com/api"
                           onChange={this.change}
                           defaultValue={url}
                           invalid={urlInvalid}/>

                <TextInput name="intervalTimer"
                           type="text"
                           labelText="check server every (ms)"
                           placeholder="Ex: 5000"
                           onChange={this.change}
                           defaultValue={intervalTimer}
                           invalid={intervalTimerInvalid}/>

                <TextInput name="productsCriticalStock"
                           type="number"
                           labelText="product's critical stock"
                           placeholder="Ex: 7"
                           onChange={this.change}
                           defaultValue={productsCriticalStock}
                           invalid={productsCriticalStockInvalid}/>

                <TextInput name="customersCriticalBalance"
                           type="number"
                           labelText="customer's critical balance"
                           placeholder="Ex: 3.2"
                           onChange={this.change}
                           defaultValue={customersCriticalBalance}
                           invalid={customersCriticalBalanceInvalid}/>

                <div className="mb-6">
                    <label htmlFor="lang">{langFunction('language', upperFirstLetter)}{langFunction(':')} </label>
                    <Select items={Object.entries(AVAILABLE_LANGS).map(([value, text]) => {
                        return { text, value };
                    })}
                            displayDefault={false}
                            name="lang"
                            className="mt-2"
                            selected={lang}
                            itemFormatter={upperFirstLetter}
                            onChange={this.change}
                            invalid={langInvalid}/>
                </div>
            </div>
        );
    }

    render() {
        const { isOpen, onClose } = this.props;

        return (
            <Modal isOpen={isOpen}
                   style={style}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest">

                <h2>{langFunction('parameters', upperFirstLetter)}</h2>

                <Separator my={4}/>

                {this.buildForm()}

                <Separator my={4}/>

                <FlexDiv justify="end">
                    <Button className="mr-3 capitalize" onClick={this.saveMiddleware} bgColor="green" hoverBgColor="green-dark"> {langFunction(
                        'save')} </Button>
                    <Button className="ml-3 capitalize" onClick={onClose}> {langFunction('cancel')} </Button>
                </FlexDiv>
            </Modal>
        );
    }

    saveMiddleware() {
        const { url, intervalTimer, customersCriticalBalance, productsCriticalStock, lang } = this.state;
        const { onSave } = this.props;

        if (!url || !intervalTimer || !customersCriticalBalance || !productsCriticalStock || !lang) {
            if (!url) {
                this.setState({
                    urlInvalid: true,
                });
            }
            if (!intervalTimer) {
                this.setState({
                    intervalTimerInvalid: true,
                });
            }
            if (!customersCriticalBalance) {
                this.setState({
                    customersCriticalBalanceInvalid: true,
                });
            }
            if (!productsCriticalStock) {
                this.setState({
                    productsCriticalStockInvalid: true,
                });
            }
            if (!lang) {
                this.setState({
                    langInvalid: true,
                });
            }

            return;
        }

        return onSave({ url, intervalTimer, customersCriticalBalance, productsCriticalStock, lang });
    }

    change(event) {
        if (event.target.name === 'customersCriticalBalance' && !isNumberValid(event.target.value)) {
            event.target.value = this.state.customersCriticalBalance;
            return;
        }
        else if (event.target.name === 'productsCriticalStock' && !isNumberValid(event.target.value)) {
            event.target.value = this.state.productsCriticalStock;
            return;
        }

        this.setState({
            [event.target.name]: event.target.value,
            [event.target.name + 'Invalid']: false,
        });
    }
}

function TextInput(props) {
    const { name, labelText, defaultValue, placeholder, invalid, onChange, type } = props;

    return (
        <div className="mb-4">
            <label htmlFor={name}>{langFunction(labelText, upperFirstLetter)}{langFunction(':')} </label>
            <input type={type}
                   name={name}
                   placeholder={placeholder}
                   className={classNames(
                       `mt-2 appearance-none border rounded pl-4 py-2 w-full`, {
                           'border-red-light': invalid,
                       })
                   }
                   onChange={onChange}
                   defaultValue={defaultValue}
            />
        </div>
    );
}

function mapStateToProps(state) {
    return {
        parameters: state.parameters,
    };
}


export default connect(mapStateToProps)(ParametersModal);