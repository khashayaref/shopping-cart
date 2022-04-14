import formatCurrency from '../../utils';
import './product.scss'
import {Fade, Zoom} from 'react-awesome-reveal'
import Modal from 'react-modal'
import { useState } from 'react';

const customStyle = {
    content : {
        left: '33%',
        width: '600px',
        height: '500px',
        position: "relative",
    },
}

Modal.setAppElement('#root');
const Product = ({item, addToCart}) => {
    const [openModal, setOpenModal] = useState(false)
    return ( 
        <>
            <Fade direction='up' cascade={true}>
                <div className='product'>
                    <li>
                        <div>
                            <a href={'#' + item._id} onClick={() => setOpenModal(true)}>
                                <img src={item.image} alt={item.title} />
                                <p>{item.title}</p>
                            </a>
                            <div className="product-price">
                                <div>
                                    {formatCurrency(item.price)}
                                </div>
                                <button onClick={() => addToCart(item)} className='button'>
                                    Add To Cart
                                </button>
                            </div>
                        </div>
                    </li>
                </div>
            </Fade>
            {openModal && (
                <Modal isOpen={openModal} onRequestClose={() => setOpenModal(false)} style={customStyle}>
                    <Zoom>
                        <button className='close-modal' onClick={() => setOpenModal(false)}>X</button>
                        <div className='product-details'>
                            <img src={item.image} alt={item.title} />
                            <div className="product-details-description">
                                <p>
                                    <strong>{item.title}</strong>
                                </p>
                                <p>
                                    {item.description}
                                </p>
                                <p>
                                    Avalable Sizes: {' '}
                                    {
                                        item.availableSizes.map((x, index) => (
                                            <span key={index}>{' '} <button className='button'>{x}</button></span>
                                        ))
                                    }
                                </p>
                            </div>
                            <div className="product-price">
                                <div>{formatCurrency(item.price)}</div>
                                <button className='button' onClick={() => {
                                    addToCart(item);
                                    setOpenModal(false);
                                    }}>Add To Cart</button>
                            </div>
                        </div>
                    </Zoom>
                </Modal>
            )}
        </>
        
     );
}
 
export default Product;