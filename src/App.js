import { useState } from 'react';
import './App.scss';
import Header from './components/header/Header';
import Product from './components/product/Product';
import ProductSideBar from './containers/product-sidebar/ProductSideBar';
import data from './data.json'

function App() {
  const [products, setProducts] = useState(data.products)
  const [size, setSize] = useState("")
  const [sort, setSort] = useState("")

  return (
    <div className="App">
      <Header/>
      <main>
        <ProductSideBar items={products}/>
      </main>
      <footer>
        All Right Is Reserved.
      </footer>
    </div>
  );
}

export default App;
