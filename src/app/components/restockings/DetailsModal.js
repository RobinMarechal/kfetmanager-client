import React from 'react';
import { customDateFormat, formatNumber, upperFirstLetter } from '../../../libs/helpers';
import lang from '../../../resources/lang';
import Modal from 'react-modal';
import Separator from '../utility/Separator';
import FlexDiv from '../utility/FlexDiv';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faPencilAlt, faTimes } from '@fortawesome/fontawesome-free-solid/index.es';
import DeleteItemModal from './items/DeleteItemModal';
import EditItemModal from './items/EditItemModal';
import { connect } from 'react-redux';
import Button from '../utility/Button';
import EditRestockingModal from './EditRestockingModal';
import Product from '../../models/Product';

Modal.setAppElement('#root');

const PRODUCT_LIST_MAX_HEIGHT = '500px';

const style = {
    content: {
        top: '50%',
        left: '50%',
        width: '900px',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};

const RIGHT_WIDTH = 600;

class DetailsModal extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            editItem: null,
            deleteItem: null,
            isAddItemModalOpen: false,
            isRestockingEditModalOpen: false,
        };

        this.toggleEditRestockingModal = this.toggleEditRestockingModal.bind(this);
        this.toggleEditItemModal = this.toggleEditItemModal.bind(this);
        this.toggleDeleteItemModal = this.toggleDeleteItemModal.bind(this);
        this.toggleAddItemModal = this.toggleAddItemModal.bind(this);
        this.closeEditItemModal = this.closeDeleteItemModal.bind(this);
        this.closeDeleteItemModal = this.closeDeleteItemModal.bind(this);
        this.closeEditRestockingModal = this.closeEditRestockingModal.bind(this);
        this.editRestocking = this.editRestocking.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.editItem = this.editItem.bind(this);
        this.addItem = this.addItem.bind(this);
    }

    buildRestockingList() {
        const { restocking } = this.props;
        let { products } = restocking;

        Product.sortProductsListBy(products, 'name');

        return products.map((product) => {
            const { id, name, pivot } = product;
            return (
                <FlexDiv key={id} justify="start" className="hover:show-child">
                    <p> {upperFirstLetter(name)} <i className="text-grey-dark">(x{pivot.quantity})</i></p>
                    <div className="ml-auto">
                        <button className="hover:opacity-full parent-hover:show" onClick={() => this.toggleEditItemModal(product)}>
                            <FontAwesomeIcon className="text-grey text-purple text-2xl" icon={faPencilAlt}/>
                        </button>
                        <button className="ml-2 mr-8 hover:opacity-full parent-hover:show"
                                onClick={() => this.toggleDeleteItemModal(product)}>
                            <FontAwesomeIcon className="text-grey text-red-light text-2xl" icon={faTimes}/>
                        </button>
                    </div>
                </FlexDiv>
            );
        });
    }

    render() {
        const { isOpen, onClose, restocking, products: allProducts } = this.props;
        if (!restocking) return null;
        const { created_at, comment, total_cost, products: restockingProducts } = restocking;

        const restockingProductsIds = restockingProducts.map((p) => p.id);
        const availableProducts = allProducts.items.filter((p) => !restockingProductsIds.includes(p.id));

        const formattedDate = customDateFormat(created_at, lang('orderHistoryDateTimeFormat'));
        const formattedPrice = formatNumber(total_cost);

        return (
            <Modal isOpen={isOpen}
                   shouldCloseOnEsc={true}
                   style={style}
                   onRequestClose={() => onClose()}
                   className="rounded p-4 shadow-lg m-auto w-1/3 bg-white absolute text-grey-darkest "
                   shouldCloseOnOverlayClick={true}>
                <h2>{lang('restocking details', upperFirstLetter)}</h2>

                <Separator my={4}/>

                <FlexDiv>
                    <div className="leading-normal pr-4 border-r w-full flex flex-col justify-start">
                        <p className="mb-2">
                            <span className="capitalize font-bold">Date{lang(':')}</span>
                            <span>{formattedDate}</span>
                        </p>
                        <p className="my-2">
                            <span width="150" className="capitalize font-bold">{lang('price')}{lang(':')}</span>
                            <span>{formattedPrice} €</span>
                        </p>
                        <div className="my-2">
                            <span width="150" className="capitalize font-bold">{lang('comment')}{lang(':')}</span>
                            <p className="text-justify">{comment}</p>
                        </div>

                        <FlexDiv className="mt-auto">
                            <div className="pr-2 w-1/2">
                                <Button onClick={this.toggleEditRestockingModal}>
                                    {lang('edit the restocking', upperFirstLetter)}
                                </Button>
                            </div>
                            <div className="pl-2 w-1/2">
                                <Button onClick={this.toggleAddItemModal}>
                                    {lang('add an item', upperFirstLetter)}
                                </Button>
                            </div>
                        </FlexDiv>
                    </div>

                    <div className="leading-normal pl-4 overflow-y-auto"
                         style={{ maxHeight: PRODUCT_LIST_MAX_HEIGHT, width: `${RIGHT_WIDTH}px` }}>
                        {this.buildRestockingList()}
                    </div>
                </FlexDiv>

                <EditRestockingModal isOpen={this.state.isRestockingEditModalOpen}
                                     restocking={restocking}
                                     onConfirm={this.editRestocking}
                                     onCancel={this.closeEditRestockingModal}
                />

                <DeleteItemModal product={this.state.deleteItem}
                                 onCancel={this.closeDeleteItemModal}
                                 onConfirm={this.deleteItem}/>


                <EditItemModal isOpen={this.state.editItem !== null}
                               product={this.state.editItem}
                               availableProducts={availableProducts}
                               onCancel={this.closeEditItemModal}
                               onConfirm={this.editItem}/>

                {/*Add item*/}
                <EditItemModal isOpen={this.state.isAddItemModalOpen}
                               availableProducts={availableProducts}
                               onCancel={() => this.toggleAddItemModal()}
                               onConfirm={this.addItem}/>

            </Modal>
        );
    }

    closeEditRestockingModal(){
        console.log('c', this.state.isRestockingEditModalOpen);
        this.setState({
            isRestockingEditModalOpen: false,
        });
    }

    toggleEditRestockingModal() {
        this.setState({
            isRestockingEditModalOpen: !this.state.isRestockingEditModalOpen,
        });
    }

    closeDeleteItemModal(){
        this.setState({
            deleteItem: null,
        });
    }

    toggleDeleteItemModal(product = null) {
        this.setState({
            deleteItem: product,
        });
    }

    closeEditItemModal(){
        this.setState({
            editItem: null,
        });
    }

    toggleEditItemModal(product = null) {
        this.setState({
            editItem: product,
        });
    }

    toggleAddItemModal() {
        this.setState({
            isAddItemModalOpen: !this.state.isAddItemModalOpen,
        });
    }

    async editRestocking(restocking, data) {
        if (await this.props.updateRestocking(restocking, data)) {
            this.toggleEditRestockingModal();
        }
    }

    async addItem(product, newProductId, quantity) {
        let res = true;
        if (quantity && quantity !== '0' && quantity !== '') {
            res = await this.props.updatePivot(this.props.restocking, null, newProductId, { quantity });
        }

        if (res) {
            this.toggleAddItemModal();
        }

    }

    async deleteItem(product) {
        if (await this.props.detachProduct(this.props.restocking, product)) {
            this.setState({
                deleteItem: null,
            });

            return true;
        }
    }

    async editItem(product, newProductId, quantity) {
        let res;

        if (quantity === '0' || quantity === '') {
            if (product.id === newProductId) {
                res = await this.deleteItem(product);
            }
        }
        else {
            res = await this.props.updatePivot(this.props.restocking, product, newProductId, { quantity });
        }

        if (res) {
            this.setState({
                editItem: null,
            });
        }
    }
}

function mapStateToProps(state) {
    return {
        products: state.products,
    };
}

export default connect(mapStateToProps)(DetailsModal);
