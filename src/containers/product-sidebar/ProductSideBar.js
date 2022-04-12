import Cart from '../../components/cartItem/Cart';
import Product from '../../components/product/Product';
import './product-sidebar.scss'


const ProductSideBar = ({items, addToCart, cartItems, removeItem}) => {
    return ( 
        <div className='container'>
            <div className="main">
                <ul>
                    {
                        items.map((item) => {
                            return(
                                <Product addToCart={addToCart} key={item._id} item={item}/>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="sidebar">
                <Cart removeItem={removeItem} cartItems={cartItems}/>
            </div>
        </div>
     );
}
 
export default ProductSideBar;