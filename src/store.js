import {configureStore} from '@reduxjs/toolkit'
import productReducers from './slicers/producSlicer'


export default configureStore({
    reducer:{
        products: productReducers
    }
})