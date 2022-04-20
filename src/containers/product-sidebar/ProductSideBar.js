import Cart from '../../components/cartItem/Cart';
import Product from '../../components/product/Product';
import './product-sidebar.scss'


const ProductSideBar = ({items}) => {
    return ( 
        <div className='container'>
            <div className="main">
                {items.length === 0 ? <div>loading</div> 
                    :
                    <ul>
                        {
                            items.map((item) => {
                                return(
                                    <Product key={item._id} item={item}/>
                                )
                            })
                        }
                    </ul>
                }
            </div>
            <div className="sidebar">
                <Cart/>
            </div>
        </div>
     );
}
 
export default ProductSideBar;