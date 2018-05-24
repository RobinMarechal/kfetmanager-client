import React from 'react';
import Modal from 'react-modal';
import { formatNumber, upperFirstLetter } from '../../../../../libs/helpers';
import Button from '../../../utility/Button';
import lang from '../../../../../resources/lang';
import Separator from '../../../utility/Separator';
import FlexDiv from '../../../utility/FlexDiv';
import { faExclamation, faExclamationTriangle } from '@fortawesome/fontawesome-free-solid/index.es';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

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

export default function DeleteProductModal(props) {

    const { isOpen, onConfirm, onCancel, product } = props;

    if (!product) {
        return null;
    }

    return (
        <Modal isOpen={isOpen}
               shouldCloseOnEsc={true}
               style={style}
               onRequestClose={onCancel}
               className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest"
               shouldCloseOnOverlayClick={true}>
            <h2>{lang('delete a product', upperFirstLetter)}</h2>

            <Separator my={4}/>

            <p className="text-red-light font-bold">
                <FontAwesomeIcon icon={faExclamationTriangle} className="mr-2"/>
                {lang("this can't be undone")}.
            </p>

            <div className="leading-loose mt-4">
                <p>
                    <span className="capitalize font-bold">{lang('product')}{lang(':')}</span>
                    <span>{upperFirstLetter(product.name)}</span>
                </p>
                <p>
                    <span width="150" className="capitalize font-bold">{lang('subcategory')}{lang(':')}</span>
                    <span>{upperFirstLetter(product.subcategory.name)}</span>
                </p>
                <p>
                    <span width="150" className="capitalize font-bold">{lang('category')}{lang(':')}</span>
                    <span>{upperFirstLetter(product.subcategory.category.name)}</span>
                </p>
                <p>
                    <span width="150" className="capitalize font-bold">{lang('price')}{lang(':')}</span>
                    <span>{formatNumber(product.price)} €</span>
                </p>
            </div>

            <Separator my={4}/>

            <FlexDiv>
                <Button className="mr-3 capitalize" onClick={onConfirm} bgColor="red-light" hoverBgColor="red"> {lang('confirm')} </Button>
                <Button className="ml-3 capitalize" onClick={onCancel}> {lang('cancel')} </Button>
            </FlexDiv>
        </Modal>
    );
}