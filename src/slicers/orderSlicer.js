import {createSlice, createAsyncThunk} from '@reduxjs/toolkit'

export const createOrder = createAsyncThunk('orders/createOrder', 
        async (order) => {
            return fetch('/api/orders', {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(order)
            }).then(res => res.json())
        }
    )

// export const clearOrder = createAsyncThunk('orders/clearOrder', 
//         async () => {
//             fetch('/api/deleteOrder', {
//                 method: 'DELETE'
//             })
//         }
//     )

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        order: {}, 
        status: null
    },
    reducers:{
        clearOrder:(state, action) => {
            state.order = {}
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(createOrder.pending, (state, action) => {
            state.status = 'pending'
        })
        .addCase(createOrder.fulfilled, (state, action) => {
            state.order = action.payload
            localStorage.removeItem('cartItems')
            state.status = 'success'
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.status = 'failed'
        })
    }
})

export const {clearOrder} = orderSlice.actions
export default orderSlice.reducer