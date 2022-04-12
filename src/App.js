import { useState } from 'react';
import './App.scss';
import Filter from './components/filter/Filter';
import Header from './components/header/Header';
import ProductSideBar from './containers/product-sidebar/ProductSideBar';
import data from './data.json'

function App() {
  const [products, setProducts] = useState(data.products)
  const [size, setSize] = useState("")
  const [sort, setSort] = useState("")

  const sizeProductsHandler = (e) => {
    console.log(e.target.value)
    if(e.target.value === ''){
      setSize(e.target.value)
      setProducts(data.products)
    }else{
      setSize(e.target.value)
      setProducts(data.products.filter((product) => product.availableSizes.indexOf(e.target.value) >= 0))
    }
  }

  const sortProductsHandler = (e) => {
    console.log(e.target.value)
    const sort = e.target.value
    setProducts(products.slice().sort((a, b) => (
      sort === 'lowest' ? 
      ((a.price > b.price) ? 1 : -1):
      sort === 'highest' ?
      ((a.price < b.price) ? 1: -1):
      ((a._id < b._id) ? 1: -1)
        
    )))
  }

  return (
    <div className="App">
      <Header/>
      <main>
        <Filter count={products.length} size={size} sort={sort} 
        sizeProducts={sizeProductsHandler} sortProducts={sortProductsHandler}/>
        <ProductSideBar items={products}/>
      </main>
      <footer>
        All Right Is Reserved.
      </footer>
    </div>
  );
}

export default App;
