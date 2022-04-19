import { useEffect, useState } from 'react';
import './App.scss';
import Filter from './components/filter/Filter';
import Header from './components/header/Header';
import ProductSideBar from './containers/product-sidebar/ProductSideBar';
import {useSelector, useDispatch} from 'react-redux'
import {getProducts, } from './slicers/producSlicer'


function App() {
  
  const dispatch = useDispatch()
  const allProducts = useSelector((state) => state.products.filteredProducts) 

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const createOrder = (order) => {
    alert("Need to save the order for " + order.name) 
  }

  return (
    
      <div className="App"> 
        <Header/>
        <main>
          <Filter count={allProducts.length}/>
          <ProductSideBar items={allProducts} createOrder={createOrder}/>
        </main>
        <footer>
          All Right Is Reserved.
        </footer>
      </div>
    
  );
}

export default App;
