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

class CreateCategoryModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: null,
            nameInvalid: false,
        };
    }

    componentWillMount() {
        this.onChange = this.onChange.bind(this);
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
                           placeholder={"Ex: " + lang('warm dishes', upperFirstLetter)}
                           className={classNames(
                               `mt-2 appearance-none border rounded pl-4 py-2 w-full`, {
                                   'border-red-light': this.state.nameInvalid,
                               })
                           }
                           onChange={this.onChange}
                    />
                </div>
            </div>
        );
    }

    render() {
        const { isOpen, onCancel, categories } = this.props;
        const disable = !categories || categories.error || categories.loading;

        let title = 'create a category';

        const content = this.buildContent();

        return (
            <Modal isOpen={isOpen}
                   shouldCloseOnEsc={true}
                   style={style}
                   onRequestClose={onCancel}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest"
                   shouldCloseOnOverlayClick={true}>
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
            </Modal>
        );
    }

    onChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            [event.target.name + 'Invalid']: false,
        });
    }

    onConfirmMiddleware() {
        const { name } = this.state;
        const { onConfirm, product } = this.props;

        if (!name) {
            this.setState({
                nameInvalid: true,
            });

            return;
        }

        return onConfirm({ name }, product);
    }
}

function mapStateToProps(state) {
    return {
        categories: state.categories,
    };
}

export default connect(mapStateToProps)(CreateCategoryModal);