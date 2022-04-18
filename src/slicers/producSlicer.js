// import { FETCH_PRODUCTS } from "../types";
import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'
// const axios = require('axios').default;

export const getProducts = createAsyncThunk('products/getProducts', 
    async () => {
        const res = await fetch("http://localhost:5000/api/products/")
        return res.json()
    }
)

const productSlice = createSlice({
    name: 'products',
    initialState:{
        products:[],
        filteredProducts: [],
        status: null,
        error: null,
        size: '',
        sort: '',

    },
    reducers:{
        filterProduct: (state, action) => { 
            action.payload === '' ? state.filteredProducts = state.products :
            state.filteredProducts = state.products.filter(item => (
                item.availableSizes.indexOf(action.payload) >= 0
             ))
             state.size = action.payload
        },
        sortProducts : (state, action) => {
            if(action.payload === ''){
                state.filteredProducts = state.filteredProducts.sort((first, second) => (first._id > second._id) ? 1: -1)
            }else{
                const sortedProducts = state.filteredProducts.sort((first, second) => (
                    (action.payload === 'lowest') ? (first.price > second.price) ? 1 : -1
                    :
                    (first.price < second.price) ? 1 : -1
                ))
                state.filteredProducts = sortedProducts
                state.sort = action.payload
            }
        }
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state, action) => {
            state.status = 'pednding'
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = action.payload
            state.filteredProducts = action.payload
            state.status = 'success'
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const {filterProduct, sortProducts} = productSlice.actions
export default productSlice.reducer

