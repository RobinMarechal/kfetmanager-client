import React from 'react';
import Modal from 'react-modal';
import { isNumberValid, upperFirstLetter } from '../../../libs/helpers';
import lang from '../../../resources/lang';
import classNames from 'classnames';
import KeyMap from '../../../libs/KeyMap';
import { connect } from 'react-redux';
import Error from '../utility/Error';
import Loading from '../utility/Loading';
import Separator from '../utility/Separator';
import FlexDiv from '../utility/FlexDiv';
import Button from '../utility/Button';
import AddRestockingModalProductsList from './AddRestockingModalProductsList';

Modal.setAppElement('#root');

const style = {
    content: {
        top: '50%',
        left: '50%',
        width: '1200px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const MAX_CHARS = 255;

class AddRestockingModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            comment: null,
            total_cost: null,
            commentInvalid: false,
            total_costInvalid: false,

            charactersLeft: MAX_CHARS,
        };

        this.updatedProducts = {};
    }

    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onTextareaChange = this.onTextareaChange.bind(this);
        this.updateQuantity = this.updateQuantity.bind(this);
    }


    buildList() {
        const { categories } = this.props;

        if (categories.error) {
            return <Error/>;
        }

        if (categories.loading) {
            return <Loading/>;
        }

        if (categories.items.length === 0) {
            return (
                <div className="px-4 py-2">
                    <p className="pl-6 text-center">
                        -
                    </p>
                </div>
            );
        }

        return categories.items
                         .filter(cat => cat.products.length > 0)
                         .map((cat) => <AddRestockingModalProductsList key={cat.id}
                                                                       onUpdateQuantity={this.updateQuantity}
                                                                       category={cat}/>);
    }

    buildContent() {
        return (
            <div>
                <div className="mb-6 flex"
                     tabIndex="0"
                     onKeyDown={this.onKeyDown}>

                    <div className="w-1/2 mr-3">
                        <div>
                            <label htmlFor="comment">{lang('comment', upperFirstLetter)}{lang(':')} </label>
                            <textarea name="comment"
                                      rows="8"
                                      onChange={this.onTextareaChange}
                                      className={classNames(
                                          `mt-2 appearance-none border rounded pl-4 py-2 w-full`, {
                                              'border-red-light': this.state.commentInvalid,
                                          })
                                      }/>
                            <i className="text-grey-dark text-sm">
                                {lang('characters left', upperFirstLetter)}{lang(':')}
                                <span className={this.state.charactersLeft < 30 ? 'text-red-light' : ''}>
                                {this.state.charactersLeft}
                                </span>
                            </i>
                        </div>

                        <div className="mt-4">
                            <label htmlFor="total_cost">{lang('total cost', upperFirstLetter)}{lang(':')} </label>
                            <input type="text"
                                   onChange={this.onChange}
                                   name="total_cost"
                                   className={classNames(
                                       `mt-2 appearance-none border rounded pl-4 py-2 w-full`, {
                                           'border-red-light': this.state.total_costInvalid,
                                       })
                                   }/>
                        </div>
                    </div>

                    <div className="w-1/2 ml-3">
                        <label>{lang('products', upperFirstLetter)}{lang(':')} </label>
                        <ul style={{ height: '400px' }}
                            className="indent-lg px-0 text-grey-darkest h-auto overflow-y-auto shadow border rounded list-style-none my-2">
                            {this.buildList()}
                        </ul>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        const { isOpen, onCancel, categories } = this.props;
        const disable = !categories || categories.error || categories.loading;

        let title = 'new restocking';

        const content = this.buildContent();

        return (
            <Modal isOpen={isOpen}
                   shouldCloseOnEsc={false}
                   shouldCloseOnOverlayClick={false}
                   style={style}
                   onRequestClose={onCancel}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest">

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

    updateQuantity(product, quantity) {
        this.updatedProducts[product.id] = quantity;
    }

    onKeyDown(event) {
        if (event.key === KeyMap.ENTER) {
            this.onConfirmMiddleware();
        }
    }

    onTextareaChange(event) {
        if (event.target.value.length >= MAX_CHARS) {
            event.target.value = event.target.value.substring(0, MAX_CHARS);
        }

        this.onChange(event);
        this.setState({
            charactersLeft: MAX_CHARS - event.target.value.length,
        });
    }

    onChange(event) {
        if (event.target.name === 'total_cost' && !isNumberValid(event.target.value)) {
            event.target.value = this.state.total_cost;
            return;
        }

        this.setState({
            [event.target.name]: event.target.value,
            [event.target.name + 'Invalid']: false,
        });
    }

    onConfirmMiddleware() {
        const { comment, total_cost } = this.state;
        const products = this.updatedProducts;

        const { onConfirm } = this.props;

        if (!total_cost) {
            this.setState({
                total_costInvalid: !total_cost,
            });

            return;
        }

        return onConfirm({ comment, total_cost }, products);
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
    };
}

export default connect(mapStateToProps)(AddRestockingModal);