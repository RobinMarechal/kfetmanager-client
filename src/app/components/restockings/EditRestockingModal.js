import React from 'react';
import { isNumberValid, upperFirstLetter } from '../../../libs/helpers';
import lang from '../../../resources/lang/index';
import KeyMap from '../../../libs/KeyMap';
import Separator from '../utility/Separator';
import FlexDiv from '../utility/FlexDiv';
import Button from '../utility/Button';
import Modal from 'react-modal';
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

const MAX_CHARS = 255;

class EditRestockingModal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            total_cost: null,
            comment: null,
            total_cost_firstEdit: true,
            textareaFocused: false,
            charactersLeft: MAX_CHARS,
        };
    }

    componentWillMount() {
        this.onConfirmMiddleware = this.onConfirmMiddleware.bind(this);
        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onTextareaChange = this.onTextareaChange.bind(this);
        this.setTextareaFocus = this.setTextareaFocus.bind(this);
    }

    render() {
        const { onCancel, restocking, isOpen } = this.props;

        return (
            <Modal isOpen={isOpen}
                   shouldCloseOnEsc={true}
                   style={style}
                   onRequestClose={onCancel}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest "
                   shouldCloseOnOverlayClick={true}>
                <h2>{lang('edit the restocking', upperFirstLetter)}</h2>

                <Separator my={4}/>

                <div tabIndex="0" onKeyDown={this.onKeyDown}>
                    <div>
                        <div>
                            <label htmlFor="comment">{lang('comment', upperFirstLetter)}{lang(':')} </label>
                            <textarea name="comment"
                                      onFocus={() => this.setTextareaFocus()}
                                      onBlur={() => this.setTextareaFocus(false)}
                                      autoFocus
                                      rows="8"
                                      defaultValue={restocking.comment}
                                      onChange={this.onTextareaChange}
                                      className={classNames(
                                          `mt-2 appearance-none border rounded px-2 py-2 w-full`, {
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
                                   defaultValue={restocking.total_cost}
                                   className={classNames(
                                       `mt-2 appearance-none border rounded pl-4 py-2 w-full`, {
                                           'border-red-light': this.state.total_costInvalid,
                                       })
                                   }/>
                        </div>
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

    setTextareaFocus(state = true) {
        this.setState({ textareaFocused: state });
    }

    onKeyDown(event) {
        if (event.key === KeyMap.ENTER && !this.state.textareaFocused) {
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

        const newState = {
            [event.target.name]: event.target.value,
            [event.target.name + 'Invalid']: false,
        };

        if (event.target.name === 'total_cost') {
            newState[event.target.name + '_firstEdit'] = false;
        }

        this.setState(newState);
    }

    onConfirmMiddleware() {
        let { comment, total_cost, total_cost_firstEdit } = this.state;
        const { onConfirm, restocking } = this.props;

        if (comment === null && total_cost === null) {
            return this.props.onCancel();
        }
        else {
            if (comment === null) {
                comment = restocking.comment;
            }

            if (!total_cost) {
                total_cost = restocking.total_cost;
                if (!total_cost_firstEdit) {
                    this.setState({ total_costInvalid: true });
                    return;
                }
            }
        }

        return onConfirm(restocking, { comment, total_cost });
    }
}

export default EditRestockingModal;
