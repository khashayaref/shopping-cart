import {configureStore} from '@reduxjs/toolkit'
import productReducers from './slicers/producSlicer'
import cartReducers from './slicers/cartSlicer'
import orderReducers from './slicers/orderSlicer'

// const loadState = () => {
//     if(localStorage.getItem('cartItems') !== null){
//         return JSON.parse(localStorage.getItem('cartItems'))
//     }else{
//         return []
//     }
// }


export default configureStore({
    reducer:{
        products: productReducers,
        carts : cartReducers,
        orders: orderReducers,
    },
    // preloadedState: loadState(),
})