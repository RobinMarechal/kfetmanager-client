import React from 'react';
import { isNumberValid, upperFirstLetter } from '../../../../libs/helpers';
import lang from '../../../../resources/lang';
import KeyMap from '../../../../libs/KeyMap';
import Separator from '../../utility/Separator';
import FlexDiv from '../../utility/FlexDiv';
import Button from '../../utility/Button';
import Modal from 'react-modal';
import Select from '../../forms/Select';

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

class EditItemModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            quantity: null,
            product_id: null,
        };
    }

    componentWillMount() {
        this.onConfirmMiddleware = this.onConfirmMiddleware.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    render() {
        const { onCancel, product, availableProducts, isOpen } = this.props;

        const filteredAvailable = availableProducts.map((p) => {
            return {
                value: p.id,
                text: upperFirstLetter(p.name),
            };
        });

        const selectItems = product ? [{ value: product.id, text: upperFirstLetter(product.name) }, ...filteredAvailable] : filteredAvailable;

        return (
            <Modal isOpen={isOpen}
                   shouldCloseOnEsc={true}
                   style={style}
                   onRequestClose={onCancel}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest "
                   shouldCloseOnOverlayClick={true}>
                <h2>{lang(product ? 'update the item' : 'add an item', upperFirstLetter)}</h2>

                <div tabIndex="0"
                     onKeyDown={this.onKeyDown}>

                    <Separator my={4}/>

                    <div className="mb-4">
                        <label>{lang('product', upperFirstLetter)}{lang(':')}</label>
                        <Select name="product_id"
                                className="my-2"
                                onChange={this.onChange}
                                displayDefault={false}
                                selected={!product ? null : product.id}
                                items={selectItems}/>
                    </div>

                    <div className="mt-4 mb-2">
                        <label htmlFor="quantity">{lang('quantity', upperFirstLetter)}{lang(':')}</label>
                        <input className="border rounded px-2 py-2 w-full my-2"
                               name="quantity"
                               type="text"
                               defaultValue={!product ? 0 : product.pivot.quantity}
                               onChange={this.onChange}/>
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
                                onClick={onCancel}>
                            {lang('cancel')}
                        </Button>
                    </FlexDiv>
                </div>
            </Modal>
        );
    }

    onChange(event) {
        if (event.target.name === 'quantity' && !isNumberValid(event.target.value)) {
            event.target.value = this.state.quantity;
            return;
        }

        this.setState({
            [event.target.name]: event.target.value,
        });
    }

    onKeyDown(event) {
        if (event.key === KeyMap.ENTER) {
            this.onConfirmMiddleware();
        }
    }

    onConfirmMiddleware() {
        const { product, availableProducts } = this.props;

        const product_id = this.state.product_id || (product ? product.id : availableProducts.length ? availableProducts[0].id : null);

        if(product_id === null){
            return;
        }

        this.props.onConfirm(product, product_id, this.state.quantity);
    }
}

export default EditItemModal;
