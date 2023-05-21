import axios from 'axios';
import { Route, Routes } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { Header } from './components/Header/Header';
import { Drawer } from './components/Drawer/Drawer';
import { Favorite } from './page/Favorite';
import { Home } from './page/Home';
import AppContext from './context/context';
import { Orders } from './page/Orders';

function App() {
  const [cartOpened, setCartOpenet] = useState(false);
  const [items, setItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoritesResponse, itemResponse] = await Promise.all([
          axios.get('http://localhost:3001/cart'),
          axios.get('http://localhost:3001/favorites'),
          axios.get('http://localhost:3001/items')
        ])

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavorites(favoritesResponse.data);
        setItems(itemResponse.data)
      } catch (error) {
        alert('Ошибка при запросе данных!');
        console.error(error)
      }
    }
    fetchData()
  }, [])

  const onAddToCart = async (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) => prev.filter((item) => Number(item.id) !== Number(obj.id)));
        await axios.delete(`http://localhost:3001/cart/${obj.id}`)
      } else {
        setCartItems((prev) => [...prev, obj])
        await axios.post('http://localhost:3001/cart', obj)
      }
    } catch (error) {
      alert('Ошибка при добавлении в корзину!')
    }

  }
  const onRemoveItem = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/cart/${id}`)
      setCartItems((prev) => prev.filter(item => item.id !== id))
    } catch (error) {
      alert('Ошибка при удалении из корзины!');
      console.error(error)
    }

  }
  const onFavorite = async (obj) => {
    try {
      if (favorites.find(elm => elm.id === obj.id)) {
        await axios.delete(`http://localhost:3001/favorites/${obj.id}`)
        setFavorites((prev) => prev.filter(item => item.id !== obj.id))
      } else {
        await axios.post('http://localhost:3001/favorites', obj)
        setFavorites((prev) => [...prev, obj])
      }
    } catch (error) {
      alert('Не удалось добавить в фавориты!');
      console.error(error)
    }

  }
  const isItemAdded = (id) => {
    return cartItems.some((obj) => obj.id === id)
  }

  return (
    <AppContext.Provider value={{ items, cartItems, setCartItems, favorites, isItemAdded, onFavorite, onAddToCart, isLoading, setCartOpenet }}>
      <div className="wrapper-container">
        <div >
          <Drawer onClose={() => setCartOpenet(false)} onRemove={onRemoveItem} opened={cartOpened} />
        </div>
        <Header onClickCart={() => setCartOpenet(true)} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/favorites' element={<Favorite />} />
          <Route path='/orders' element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
