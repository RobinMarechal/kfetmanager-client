import React from 'react';
import { customDateFormat, formatNumber, upperFirstLetter } from '../../../libs/helpers';
import lang from '../../../resources/lang';
import Modal from 'react-modal';
import Separator from '../utility/Separator';
import FlexDiv from '../utility/FlexDiv';

Modal.setAppElement('#root');

const PRODUCT_LIST_MAX_HEIGHT = '500px';

const style = {
    content: {
        top: '50%',
        left: '50%',
        width: '800px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

class DeleteProductModal extends React.Component {
    render() {
        const { isOpen, onClose, restocking } = this.props;

        if (!restocking) {
            return null;
        }

        const { created_at, comment, total_price, products } = restocking;

        const formattedDate = customDateFormat(created_at, lang('orderHistoryDateTimeFormat'));
        const formattedPrice = formatNumber(total_price);

        return (
            <Modal isOpen={isOpen}
                   shouldCloseOnEsc={true}
                   style={style}
                   onRequestClose={() => onClose()}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest "
                   shouldCloseOnOverlayClick={true}>
                <h2>{lang('restocking details', upperFirstLetter)}</h2>

                <Separator my={4}/>

                <FlexDiv justify="start">
                    <div className="w-1/2 leading-normal pr-4 border-r">
                        <p className="mb-4">
                            <span className="capitalize font-bold">Date{lang(':')}</span>
                            <span>{formattedDate}</span>
                        </p>
                        <p className="my-4">
                            <span width="150" className="capitalize font-bold">{lang('price')}{lang(':')}</span>
                            <span>{formattedPrice} €</span>
                        </p>
                        <p className="my-4">
                            <span width="150" className="capitalize font-bold">{lang('comment')}{lang(':')}</span>
                            <p className="text-justify">{comment}</p>
                        </p>
                    </div>

                    <div className="w-1/2 leading-loose pl-4 overflow-y-auto"
                         style={{ maxHeight: PRODUCT_LIST_MAX_HEIGHT }}>
                        {products.map(({ id, name, pivot }) => {
                            return (
                                <p key={id}> {upperFirstLetter(name)} <i className="text-grey-dark text-sm">(x{pivot.quantity})</i></p>
                            );
                        })}
                    </div>
                </FlexDiv>
            </Modal>
        );
    }
}

export default DeleteProductModal;