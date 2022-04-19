import {createSlice} from '@reduxjs/toolkit'


const cartSlice = createSlice({
    name: 'carts',
    initialState: {
        cartItems : JSON.parse(localStorage.getItem('cartItems') || '[]')
    },
    reducers:{
        addCartItem: (state, action) => {
            const sentItem = action.payload
            let allCartItems = state.cartItems.slice()
            let exist = false
            allCartItems.forEach(item => {
                if(item._id === sentItem._id){
                    item.count += 1
                    exist = true
                }
            })
            if(!exist){
                allCartItems.push({...sentItem, count: 1})
            }
            localStorage.setItem('cartItems', JSON.stringify(allCartItems))
            state.cartItems = JSON.parse(localStorage.getItem('cartItems')) 
        },
        removeCartItem: (state, action) => {
            const sentItem = action.payload
            let allCartItems = state.cartItems.slice()
            allCartItems = allCartItems.filter(item => sentItem._id !== item._id)
            localStorage.setItem('cartItems', JSON.stringify(allCartItems))
            state.cartItems = JSON.parse(localStorage.getItem('cartItems')) 
        }
    }
})

export const {addCartItem, removeCartItem} = cartSlice.actions
export default cartSlice.reducer