import './cart.scss'
import formatCurrency from '../../utils';
import { useState } from 'react';


const Cart = ({cartItems, removeItem, createOrder}) => {
    const [showForm, setShowForm] = useState(false)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [address, setAddress] = useState('')

    const createOrderHandler = (e) => {
        e.preventDefault()
        const order = {
            name : name,
            email : email,
            address : address
        }
        createOrder(order)
    }

    return ( 
        <div>
            {cartItems.length === 0 ? <div className='cart cart-header'>Cart Is Empty </div>
                 :
                 <div className='cart cart-header'> Yout Have {cartItems.length} Items In Your Cart</div> 
            }
            <div>
                <div className="cart">
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
                                            <button className='button' onClick={() => removeItem(item)}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))
                        }
                    </ul>
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
                                )
                        }
                    </div>
                }
            </div>
        </div>
        
     );
}
 
export default Cart;