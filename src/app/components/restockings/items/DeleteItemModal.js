import React from 'react';
import { upperFirstLetter } from '../../../../libs/helpers';
import lang from '../../../../resources/lang';
import KeyMap from '../../../../libs/KeyMap';
import Separator from '../../utility/Separator';
import FlexDiv from '../../utility/FlexDiv';
import Button from '../../utility/Button';
import Modal from 'react-modal'


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

export default class DeleteItemModal extends React.Component{

    componentWillMount(){
        this.onKeyDown = this.onKeyDown.bind(this);
        this.div = React.createRef();
    }
    
    render() {
        const { onConfirm, onCancel, product } = this.props;

        if (!product) {
            return null;
        }

        return (
            <Modal isOpen={product !== null}
                   shouldCloseOnEsc={true}
                   onAfterOpen={() => this.div.current.focus()}
                   style={style}
                   onRequestClose={onCancel}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest "
                   shouldCloseOnOverlayClick={true}>
                <h2>{lang('remove a product from the restocking', upperFirstLetter)}</h2>

                <div tabIndex="0"
                     ref={this.div}
                     onKeyDown={this.onKeyDown}>

                    <Separator my={4}/>

                    <p> {upperFirstLetter(product.name)} <i className="text-grey-dark">(x{product.pivot.quantity})</i></p>

                    <Separator my={4}/>

                    <FlexDiv>
                        <Button className="mr-3 capitalize" onClick={() => onConfirm(product)} bgColor="red-light" hoverBgColor="red"> {lang('confirm')} </Button>
                        <Button className="ml-3 capitalize" onClick={onCancel}> {lang('cancel')} </Button>
                    </FlexDiv>
                </div>
            </Modal>
        );
    }

    onKeyDown(event) {
        if (event.key === KeyMap.ENTER) {
            const { onConfirm } = this.props;
            onConfirm(this.props.product);
        }
    }
}