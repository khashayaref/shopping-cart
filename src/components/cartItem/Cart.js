import './cart.scss'
import formatCurrency from '../../utils';
import { useState } from 'react';
import {Fade} from 'react-awesome-reveal'
import {removeCartItem, } from '../../slicers/cartSlicer'
import {useDispatch, useSelector} from 'react-redux'
import {createOrder, } from '../../slicers/orderSlicer'
import Modal from 'react-modal'
import { Zoom } from 'react-awesome-reveal';


const customStyle = {
    content : {
        left: '33%',
        width: '600px',
        height: '500px',
        position: "relative",
    },
}

const Cart = ({ }) => {
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')
    const [showModal, setShowModal] = useState(false)

    const cartItems = useSelector((state) => state.carts.cartItems)
    const order = useSelector(state => state.orders.order)
    const status = useSelector(state => state.orders.status)
    const dispatch = useDispatch()

    const createOrderHandler = (e) => {
        e.preventDefault()
        const orderItem = {
            name : name,
            email : email,
            address : address,
            total: cartItems.reduce((first, second) => first + (second.price * second.count), 0),
            cartItems: cartItems
        }
        dispatch(createOrder(orderItem))
        setShowModal(true)
    }


    return ( 
        <div>
            {cartItems.length === 0 ? <div className='cart cart-header'>Cart Is Empty </div>
                 :
                 <div className='cart cart-header'> Yout Have {cartItems.length} Items In Your Cart</div> 
            }

            {
                (status === 'success') && (<Modal isOpen={showModal} onRequestClose={() => setShowModal(false)} style={customStyle}>
                            <Zoom>
                                <button className='close-modal' onClick={() => setShowModal(false)}>X</button>
                                <div className="order-details">
                                    <h3 className="success-message">Your Order Has Been Placed Successfully</h3>
                                    <h2>Order {order._id}</h2>
                                    <ul>
                                        <li>
                                            <div>Name:</div>
                                            <div>{order.name}</div>
                                        </li>
                                        <li>
                                            <div>Email:</div>
                                            <div>{order.email}</div>
                                        </li>
                                        <li>
                                            <div>Address:</div>
                                            <div>{order.address}</div>
                                        </li>
                                        <li>
                                            <div>Date:</div>
                                            <div>{order.createdAt}</div>
                                        </li>
                                        <li>
                                            <div>Total:</div>
                                            <div>{formatCurrency(order.total)}</div>
                                        </li>
                                        <li>
                                            <div>CartItems:</div>
                                            <div className='items'>{order.cartItems.map(item => (
                                                <div>{item.count} {' x '} {item.title}</div>
                                            ))}</div>
                                        </li>
                                    </ul>
                                </div>
                            </Zoom>
                        </Modal>)
            }
            <div>
                <div className="cart">
                    <Fade cascade={true} direction='left'>
                        <ul className="cart-items">
                            {
                                cartItems.map(item => (
                                    <li key={item._id}>
                                        <div>
                                            <img src={item.image} alt={item.title} />
                                        </div>
                                        <div>
                                            <div>{item.title}</div>
                                            <div className='right'>
                                                {formatCurrency(item.price)} x {item.count} {" "}
                                                <button className='button' onClick={() => dispatch((removeCartItem(item)))}>Remove</button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    </Fade>
                </div>
                {cartItems.length !==0 && 
                    <div className="cart">
                        <div className="total">
                            <div>
                                Total: {' '}
                                {formatCurrency(cartItems.reduce((a, c) => a + (c.price * c.count), 0))}
                            </div>
                            <button onClick={() => setShowForm(true)} className='button primary'>Proceed</button>
                        </div>
                        {
                            showForm && (
                                <Fade cascade={true} direction="right">
                                    <div className='cart'>
                                        <form onSubmit={(e) => createOrderHandler(e)}>
                                            <ul className="form-container">
                                                <li>
                                                    <label htmlFor="">Email:</label>
                                                    <input type="email" placeholder='Please Enter Your Email' required 
                                                    onChange={(e) => setEmail(e.target.value)} value={email} name='email'/>
                                                </li>
                                                <li>
                                                    <label htmlFor="">Name:</label>
                                                    <input type="text" placeholder='Please Enter Your Name' required 
                                                    onChange={(e) => setName(e.target.value)} value={name} name='name'/>
                                                </li>
                                                <li>
                                                    <label htmlFor="">Address:</label>
                                                    <input type="text" placeholder='Please Enter Your Address' required 
                                                    onChange={(e) => setAddress(e.target.value)} value={address} name='address'/>
                                                </li>
                                                <li>
                                                    <button className='button primary' type='submit'>Checkout</button>
                                                </li>
                                            </ul>
                                        </form>
                                    </div>
                                </Fade>
                                )
                        }
                    </div>
                }
            </div>
        </div>
        
     );
}
 
export default Cart;