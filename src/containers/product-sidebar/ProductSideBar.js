import Product from '../../components/product/Product';
import './product-sidebar.scss'


const ProductSideBar = ({items}) => {
    return ( 
        <div className='container'>
            <div className="main">
                <ul>
                    {
                        items.map((item) => {
                            return(
                                <Product key={item._id} item={item}/>
                            )
                        })
                    }
                </ul>
            </div>
            <div className="sidebar">
                Cart Items
            </div>
        </div>
     );
}
 
export default ProductSideBar;