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
        status: null,
        error: null
    },
    reducers:{
        
    }, 
    extraReducers: (builder) => {
        builder
        .addCase(getProducts.pending, (state, action) => {
            state.status = 'pednding'
        })
        .addCase(getProducts.fulfilled, (state, action) => {
            state.products = state.products.concat(action.payload)
            state.status = 'success'
        })
        .addCase(getProducts.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

// export const { } = productSlice.actions
export default productSlice.reducer

