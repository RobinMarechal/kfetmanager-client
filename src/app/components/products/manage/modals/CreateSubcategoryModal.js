import React from 'react';
import Modal from 'react-modal';
import { upperFirstLetter } from '../../../../../libs/helpers';
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

class CreateSubcategoryModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            category_id: null,
            nameInvalid: false,
            category_idInvalid: false,
        };
    }

    componentWillMount() {
        this.onChange = this.onChange.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
    }

    buildContent() {
        const { categories } = this.props;

        if (!categories || categories.error) {
            return <Error textFormatter={upperFirstLetter}/>;
        }

        if (categories.loading) {
            return <Loading/>;
        }

        return (
            <div>
                <div className="mb-6">
                    <label htmlFor="name">{lang('name', upperFirstLetter)}{lang(':')} </label>
                    <input type="text"
                           name="name"
                           placeholder="Ex: Pizzas"
                           className={classNames(
                               `mt-2 appearance-none border rounded pl-4 py-2 w-full`, {
                                   'border-red-light': this.state.nameInvalid,
                               })
                           }
                           onChange={this.onChange}
                    />
                </div>


                <div className="mb-6">
                    <label htmlFor="category_id">{lang('category', upperFirstLetter)}{lang(':')} </label>
                    <Select items={Object.values(categories.items).map((cat) => ({ text: cat.name, value: cat.id }))}
                            name="category_id"
                            className="mt-2"
                            itemFormatter={upperFirstLetter}
                            onChange={this.onChange}
                            disableAll={true}
                            invalid={this.state.category_idInvalid}
                            allText={lang('choose a category', upperFirstLetter)}/>
                </div>
            </div>
        );
    }

    render() {
        const { isOpen, onCancel, categories } = this.props;
        const disable = !categories || categories.error || categories.loading;

        let title = 'create a subcategory';

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
        console.log(event);
        this.setState({
            [event.target.name]: event.target.value,
            [event.target.name + 'Invalid']: false,
        });
    }

    onConfirmMiddleware() {
        const { name, category_id } = this.state;
        const { onConfirm, product } = this.props;

        if (!name || !category_id) {
            if (!name) {
                this.setState({
                    nameInvalid: true,
                });
            }
            if (!category_id) {
                this.setState({
                    category_idInvalid: true,
                });
            }
            return;
        }

        return onConfirm({ name, category_id }, product);
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
    };
}

export default connect(mapStateToProps)(CreateSubcategoryModal);