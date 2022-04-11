import formatCurrency from '../../utils';
import './product.scss'


const Product = ({item}) => {
    return ( 
        <div className='product'>
            <li>
                <div>
                    <a href={'#' + item._id}>
                        <img src={item.image} alt={item.title} />
                        <p>{item.title}</p>
                    </a>
                    <div className="product-price">
                        <div>
                            {formatCurrency(item.price)}
                        </div>
                        <button className='button primary'>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </li>
        </div>
     );
}
 
export default Product;