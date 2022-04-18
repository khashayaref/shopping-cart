import Cart from '../../components/cartItem/Cart';
import Product from '../../components/product/Product';
import './product-sidebar.scss'


const ProductSideBar = ({items, addToCart, cartItems, removeItem, createOrder}) => {
    return ( 
        <div className='container'>
            <div className="main">
                {items.length === 0 ? <div>loading</div> 
                    :
                    <ul>
                        {
                            items.map((item) => {
                                return(
                                    <Product addToCart={addToCart} key={item._id} item={item}/>
                                )
                            })
                        }
                    </ul>
                }
            </div>
            <div className="sidebar">
                <Cart createOrder={createOrder} removeItem={removeItem} cartItems={cartItems}/>
            </div>
        </div>
     );
}
 
export default ProductSideBar;