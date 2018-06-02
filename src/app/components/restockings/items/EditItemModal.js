import React from 'react';
import { isNumberValid, upperFirstLetter } from '../../../../libs/helpers';
import lang from '../../../../resources/lang';
import KeyMap from '../../../../libs/KeyMap';
import Separator from '../../utility/Separator';
import FlexDiv from '../../utility/FlexDiv';
import Button from '../../utility/Button';
import Modal from 'react-modal';
import Select from '../../forms/Select';
import classNames from 'classnames';

const style = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        width: '400px',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const DEFAULT_STATE = {
    quantity: null,
    product_id: null,
    quantityInvalid: false,
    productInvalid: false,
};

class EditItemModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = DEFAULT_STATE;
    }

    componentWillMount() {
        this.onConfirmMiddleware = this.onConfirmMiddleware.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.close = this.close.bind(this);
    }

    render() {
        const { product, availableProducts, isOpen } = this.props;

        const filteredAvailable = availableProducts.map((p) => {
            return {
                value: p.id,
                text: upperFirstLetter(p.name),
            };
        });

        let selectItems = filteredAvailable;

        // Heavy, but removes a warning...
        if (product && !filteredAvailable.map(e => e.value).includes(product.id)) {
            selectItems = [{ value: product.id, text: upperFirstLetter(product.name) }, ...filteredAvailable];
        }

        if (selectItems.length > 1) {
            selectItems.sort((a, b) => a.text.toLowerCase().localeCompare(b.text.toLowerCase()));
        }

        return (
            <Modal isOpen={isOpen}
                   shouldCloseOnEsc={true}
                   style={style}
                   onRequestClose={this.close}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest "
                   shouldCloseOnOverlayClick={true}>
                <h2>{lang(product ? 'update the item' : 'add an item', upperFirstLetter)}</h2>

                <div tabIndex="0"
                     onKeyDown={this.onKeyDown}>

                    <Separator my={4}/>

                    <div className="mb-4">
                        <label>{lang('product', upperFirstLetter)}{lang(':')}</label>
                        <Select name="product_id"
                                className={"my-2"}
                                onChange={this.onChange}
                                invalid={this.state.productInvalid}
                                displayDefault={false}
                                selected={!product ? null : product.id}
                                items={selectItems}/>
                    </div>

                    <div className="mt-4 mb-2">
                        <label htmlFor="quantity">{lang('quantity', upperFirstLetter)}{lang(':')}</label>
                        <input name="quantity"
                               autoFocus
                               type="text"
                               defaultValue={!product ? 0 : product.pivot.quantity}
                               onChange={this.onChange}
                               className={classNames("border rounded px-2 py-2 w-full my-2", {
                                   'border-red-light': this.state.quantityInvalid,
                               })}
                        />
                    </div>

                    <Separator my={4}/>

                    <FlexDiv>
                        <Button className="mr-3 capitalize"
                                onClick={this.onConfirmMiddleware}
                                bgColor="green"
                                hoverBgColor="green-dark">
                            {lang('confirm')}
                        </Button>
                        <Button className="ml-3 capitalize"
                                onClick={this.close}>
                            {lang('cancel')}
                        </Button>
                    </FlexDiv>
                </div>
            </Modal>
        );
    }

    close() {
        this.resetState();
        this.props.onCancel();
    }

    resetState() {
        this.setState(DEFAULT_STATE);
    }

    onChange(event) {
        if (event.target.name === 'quantity' && !isNumberValid(event.target.value)) {
            event.target.value = this.state.quantity;
            return;
        }

        this.setState({
            [event.target.name]: event.target.value,
            [event.target.name + "Invalid"]: false,
        });
    }

    onKeyDown(event) {
        if (event.key === KeyMap.ENTER) {
            this.onConfirmMiddleware();
        }
    }

    onConfirmMiddleware() {
        const { product, availableProducts } = this.props;
        let { quantity } = this.state;
        let productInvalid = false;
        let quantityInvalid = false;

        const product_id = this.state.product_id || (product ? product.id : availableProducts.length ? availableProducts[0].id : null);

        if (product_id === null) {
            productInvalid = true;
            this.setState({
                productInvalid: true,
            });
        }

        if (quantity === "" || quantity === "0" || (!quantity && !this.props.product)) {
            quantityInvalid = true;
            this.setState({
                quantityInvalid: true,
            });
        }

        if (quantityInvalid || productInvalid) {
            return false;
        }

        if (quantity == null && (!product || product.id === product_id)) {
            this.props.onCancel();
            return;
        }

        // At this point, is the quantity is null, then it hasn't been modified and should take the stored value
        if (!quantity && product) {
            quantity = product.pivot.quantity;
        }

        this.props.onConfirm(product, product_id, quantity);
        this.resetState();
    }
}

export default EditItemModal;
