import React from 'react';
import Modal from 'react-modal';
import { isNumberValid, upperFirstLetter } from '../../../../../libs/helpers';
import Button from '../../../utility/Button';
import lang from '../../../../../resources/lang';
import Separator from '../../../utility/Separator';
import FlexDiv from '../../../utility/FlexDiv';
import { connect } from 'react-redux';
import Error from '../../../utility/Error';
import Loading from '../../../utility/Loading';
import Select from '../../../forms/Select';
import classNames from 'classnames';
import KeyMap from '../../../../../libs/KeyMap';

Modal.setAppElement('#root');

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

class EditProductModal extends React.Component {

    constructor(props) {
        super(props);

        const { product } = props;

        this.state = {
            name: product ? product.name : null,
            price: product ? product.price : null,
            subcategory_id: !product ? null : product.subcategory_id ? product.subcategory_id : product.subcategory ? product.subcategory.id : null,
            nameInvalid: false,
            subcategory_idInvalid: false,
            priceInvalid: false,
        };
    }

    componentWillReceiveProps(nextProps) {
        const { product, creation } = nextProps;

        let { name, price, subcategory_id } = this.state;

        if (product && !creation) {
            name = product.name;
            price = product.price;
            subcategory_id = product.subcategory_id;
        }

        this.setState({ name, price, subcategory_id });
    }

    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    buildContent() {
        const { subcategories, product } = this.props;

        if (!subcategories || subcategories.error) {
            return <Error textFormatter={upperFirstLetter}/>;
        }

        if (subcategories.loading) {
            return <Loading/>;
        }

        return (
            <div>
                <div className="mb-6">
                    <label htmlFor="name">{lang('product name', upperFirstLetter)}{lang(':')} </label>
                    <input type="text"
                           name="name"
                           placeholder="Ex: Kinder Bueno"
                           className={classNames(
                               `mt-2 appearance-none border rounded pl-4 py-2 w-full`, {
                                   'border-red-light': this.state.nameInvalid,
                               })
                           }
                           onChange={this.onChange}
                           defaultValue={product ? product.name : null}
                    />
                </div>

                <div className="mb-6">
                    <label htmlFor="subcategory_id">{lang('subcategory', upperFirstLetter)}{lang(':')} </label>
                    <Select items={Object.values(subcategories.items).map((sub) => {
                        let text = sub.name;
                        if (sub.category) {
                            text += ' (' + upperFirstLetter(sub.category.name) + ')';
                        }

                        return {
                            text,
                            value: sub.id,
                        };
                    })}
                            name="subcategory_id"
                            className="mt-2"
                            selected={product ? product.subcategory.name : null}
                            itemFormatter={upperFirstLetter}
                            onChange={this.onChange}
                            disableAll={true}
                            invalid={this.state.subcategory_idInvalid}
                            allText={lang('choose a subcategory', upperFirstLetter)}/>
                </div>

                <div className="mb-6">
                    <label htmlFor="price">{lang('selling price', upperFirstLetter)}{lang(':')} </label>
                    <input type="text"
                           onChange={this.onChange}
                           name="price"
                           className={classNames(
                               `mt-2 appearance-none border rounded pl-4 py-2 w-full`, {
                                   'border-red-light': this.state.priceInvalid,
                               })
                           }
                           defaultValue={product ? product.price : null}
                    />
                </div>
            </div>
        );
    }

    render() {
        const { isOpen, onCancel, product, subcategories } = this.props;
        const disable = !subcategories || subcategories.error || subcategories.loading;

        let title = 'create a product';
        if (product) {
            title = 'update a product';
        }

        const content = this.buildContent();

        return (
            <Modal isOpen={isOpen}
                   shouldCloseOnEsc={true}
                   style={style}
                   onRequestClose={onCancel}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest"
                   shouldCloseOnOverlayClick={true}>

                <div tabIndex="0"
                     onKeyDown={this.onKeyDown}>

                    <h2>{lang(title, upperFirstLetter)}</h2>

                    <Separator my={4}/>

                    {content}

                    <Separator my={4}/>

                    <FlexDiv>
                        <Button disabled={disable}
                                disabledBgColor="green-lighter"
                                className="mr-3 capitalize"
                                onClick={() => {
                                    if (!disable) this.onConfirmMiddleware();
                                }}
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

    onKeyDown(event) {
        if (event.key === KeyMap.ENTER) {
            this.onConfirmMiddleware();
        }
    }

    onChange(event) {
        if (event.target.name === 'price' && !isNumberValid(event.target.value)) {
            event.target.value = this.state.price;
            return;
        }

        this.setState({
            [event.target.name]: event.target.value,
            [event.target.name + 'Invalid']: false,
        });
    }

    onConfirmMiddleware() {
        const { name, price, subcategory_id } = this.state;
        const { onConfirm, product } = this.props;

        if (!name || !price || !subcategory_id) {
            if (!name) {
                this.setState({
                    nameInvalid: true,
                });
            }
            if (!price) {
                this.setState({
                    priceInvalid: true,
                });
            }
            if (!subcategory_id) {
                this.setState({
                    subcategory_idInvalid: true,
                });
            }
            return;
        }

        return onConfirm({ name, price, subcategory_id }, product);
    }
}

function mapStateToProps(state) {
    return {
        subcategories: state.subcategories,
    };
}

export default connect(mapStateToProps)(EditProductModal);