import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useEffect, useState } from 'react';
import Home from './pages/Home';
import { Route, Routes } from 'react-router-dom';
import Favorites from './pages/Favorites';

function App() {
    const API_URL = 'https://my.api.mockaroo.com/sneakers?key=d8035040';
    const CART_URL = 'https://648dc1b72de8d0ea11e82e09.mockapi.io/cart';
    const FAV_URL = 'https://648dc1b72de8d0ea11e82e09.mockapi.io/favorites';
    const [isLoading, setIsLoading] = useState(true);

    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [favorites, setFavorites] = useState([]);

    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        fetch(API_URL)
            .then((data) => data.json())
            .then((items) => setItems(items))
            .catch((e) => alert('Ошибка загрузки данных: ' + e.message))
            .finally(setIsLoading(false));

        axios
            .get(CART_URL)
            .then((res) => setCartItems(res.data))
            .catch((e) => alert('Ошибка загрузки корзины: ' + e.message));

        axios
            .get(FAV_URL)
            .then((res) => setFavorites(res.data))
            .catch((e) => alert('Ошибка загрузки закладок: ' + e.message));
    }, []);

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const onAddToCart = async (obj) => {
        if (cartItems.find((itemObj) => itemObj.id === obj.id)) {
            axios.delete(`${CART_URL}/${obj.id}`);
            setCartItems((prev) => prev.filter((item) => item.id !== obj.id));
        } else {
            const { data } = await axios.post(CART_URL, obj);
            setCartItems((prev) => [...prev, data]);
        }
    };

    const onAddFavorite = async (obj) => {
        if (favorites.find((favObj) => favObj.id === obj.id)) {
            axios.delete(`${FAV_URL}/${obj.id}`);
        } else {
            const { data } = await axios.post(FAV_URL, obj);
            setFavorites((prev) => [...prev, data]);
        }
    };

    const onDeleteItem = (id) => {
        axios.delete(`${CART_URL}/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <div className="wrapper clear">
            {cartOpened && (
                <Drawer
                    onCloseCart={() => setCartOpened(false)}
                    onDelete={onDeleteItem}
                    items={cartItems}
                />
            )}
            <Header onClickCart={() => setCartOpened(true)} />

            <Routes>
                <Route
                    path="/"
                    element={
                        <Home
                            items={items}
                            searchValue={searchValue}
                            setSearchValue={setSearchValue}
                            onChangeSearchInput={onChangeSearchInput}
                            onAddFavorite={onAddFavorite}
                            onAddToCart={onAddToCart}
                            isLoading={isLoading}
                        />
                    }
                    exact
                ></Route>
                <Route
                    path="/favorites"
                    element={
                        <Favorites
                            items={favorites}
                            onAddFavorite={onAddFavorite}
                        />
                    }
                ></Route>
            </Routes>
        </div>
    );
}

export default App;
