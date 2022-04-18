import { useEffect, useState } from 'react';
import './App.scss';
import Filter from './components/filter/Filter';
import Header from './components/header/Header';
import ProductSideBar from './containers/product-sidebar/ProductSideBar';
import data from './data.json'
import {useSelector, useDispatch} from 'react-redux'
import {getProducts, } from './slicers/producSlicer'


function App() {
  const [cartItems, setCartItems] = useState(localStorage.getItem('cartItems') ? JSON.parse(localStorage.getItem('cartItems')) : [])
  
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.products.filteredProducts) 
  const size = useSelector(state => state.products.size)

  useEffect(() => {
    dispatch(getProducts())
  }, [])


  const addToCartHandler = (product) => {
    const itemProducts = cartItems.slice()
    let alreadyInCart = false
    itemProducts.forEach(item => {
      if(item._id === product._id){
        item.count += 1
        alreadyInCart = true
        setCartItems(itemProducts)
      }
    })
    if(!alreadyInCart){
      itemProducts.push({...product, count: 1})
      setCartItems(itemProducts)
    }
    localStorage.setItem('cartItems', JSON.stringify(itemProducts))
  }

  const removeItemHandler = (cartItem) => {
    const allCartItems = cartItems.slice()
    setCartItems(allCartItems.filter((item) => item._id !== cartItem._id))
    localStorage.setItem('cartItems', JSON.stringify(allCartItems.filter((item) => item._id !== cartItem._id)))
  }

  const createOrder = (order) => {
    alert("Need to save the order for " + order.name) 
  }

  return (
    
      <div className="App"> 
        <Header/>
        <main>
          <Filter count={allProducts.length}/>
          <ProductSideBar cartItems={cartItems} addToCart={addToCartHandler}
          removeItem={removeItemHandler} items={allProducts} createOrder={createOrder}/>
        </main>
        <footer>
          All Right Is Reserved.
        </footer>
      </div>
    
  );
}

export default App;
