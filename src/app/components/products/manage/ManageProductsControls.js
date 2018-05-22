import React from 'react';
import lang from '../../../../resources/lang';
import { upperFirstLetter } from '../../../../libs/helpers';
import Button from '../../utility/Button';
import Separator from '../../utility/Separator';
import FlexDiv from '../../utility/FlexDiv';
import { faEdit } from '@fortawesome/fontawesome-free-solid/index.es';
import { faTrashAlt } from '@fortawesome/fontawesome-free-regular/index.es';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';

export default function ManageProductsControls(props) {
    const { onSearch, onEdit, onDelete, onAddProduct, onAddSubcategory, onAddCategory } = props;

    return (
        <div className="text-grey-darkest p-4">
            {/*<h1 className="text-center">{lang('filters', upperFirstLetter)}</h1>*/}

            <h4>
                {lang('search for a product', upperFirstLetter)}{lang(':')}
            </h4>
            <input onChange={onSearch}
                   placeholder="Ex: bueno"
                   className="mt-2 appearance-none border rounded pl-4 py-2 w-full"
                   type="text"
            />

            <Separator/>

            <FlexDiv>
                <Button width="1/2"
                        className="mr-2"
                        title={lang('edit the selected product', upperFirstLetter)}
                        onClick={onEdit}
                        disabled={props.selected === null}
                        disabledTitle={lang('click on product', upperFirstLetter)}>
                    {lang('edit', upperFirstLetter)}
                    <FontAwesomeIcon icon={faEdit} className="ml-2"/>
                </Button>
                <Button width="1/2"
                        bgColor="red-light"
                        hoverBgColor="red"
                        className="ml-2"
                        onClick={onDelete}
                        title={lang('delete the selected product', upperFirstLetter)}
                        disabledBgColor="red-lighter"
                        disabled={props.selected === null}
                        disabledTitle={lang('click on product', upperFirstLetter)}>
                    {lang('remove', upperFirstLetter)}
                    <FontAwesomeIcon icon={faTrashAlt} className="ml-2"/>
                </Button>
            </FlexDiv>

            <Separator/>

            <div>
                <Button className="my-2" onClick={onAddProduct}>
                    {lang('add a product', upperFirstLetter)}
                </Button>
                <Button className="my-2" onClick={onAddSubcategory}>
                    {lang('add a subcategory', upperFirstLetter)}
                </Button>
                <Button className="my-2" onClick={onAddCategory}>
                    {lang('add a category', upperFirstLetter)}
                </Button>
            </div>


            {/*----------*/}
            {/*new product*/}
            {/*new subcategory*/}
            {/*new category*/}


        </div>
    );
}