import axios from 'axios';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';

const API_URL = 'https://my.api.mockaroo.com/sneakers?key=d8035040';
export const CART_URL = 'https://648dc1b72de8d0ea11e82e09.mockapi.io/cart';
const FAV_URL = 'https://648dc1b72de8d0ea11e82e09.mockapi.io/favorites';
export const ORDERS_URL = 'https://64845437ee799e32162686ba.mockapi.io/orders';

function App() {
    const [isLoading, setIsLoading] = useState(true);

    const [items, setItems] = useState([]);
    const [searchValue, setSearchValue] = useState('');

    const [favorites, setFavorites] = useState([]);

    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        setIsLoading(true);
        async function fetchData() {
            const cartResponse = await axios.get(CART_URL);
            const favoritesResponse = await axios.get(FAV_URL);
            const itemsResponse = await axios.get(API_URL);
            setCartItems(cartResponse.data);
            setFavorites(favoritesResponse.data);
            setItems(itemsResponse.data);
            setTimeout(() => {
                setIsLoading(false);
            }, 1000);
        }
        fetchData();
    }, []);

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const onAddToCart = async (obj) => {
        try {
            if (cartItems.find((itemObj) => +itemObj.id === +obj.id)) {
                setCartItems((prev) =>
                    prev.filter((item) => +item.id !== +obj.id)
                );
                axios.delete(`${CART_URL}/${obj.id}`);
            } else {
                await axios.post(CART_URL, obj);
                setCartItems((prev) => [...prev, obj]);
            }
        } catch (error) {
            alert('Не удалось добавить в корзину ' + error.message);
        }
    };

    const onAddFavorite = async (obj) => {
        try {
            if (favorites.find((favObj) => +favObj.id === +obj.id)) {
                axios.delete(`${FAV_URL}/${obj.id}`);
                setFavorites((prev) =>
                    prev.filter((item) => +item.id !== +obj.id)
                );
            } else {
                const { data } = await axios.post(FAV_URL, obj);
                setFavorites((prev) => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в закладки ' + error.message);
        }
    };

    const onDeleteItem = (id) => {
        axios.delete(`${CART_URL}/${id}`);
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => +obj.id === +id);
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                onAddFavorite,
                setCartOpened,
                setCartItems,
            }}
        >
            <div className="wrapper clear">
                {cartOpened && (
                    <Drawer onDelete={onDeleteItem} items={cartItems} />
                )}
                <Header />

                <Routes>
                    <Route
                        path="/"
                        element={
                            <Home
                                items={items}
                                cartItems={cartItems}
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
                    <Route path="/favorites" element={<Favorites />}></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
