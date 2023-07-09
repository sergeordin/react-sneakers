import axios from 'axios';
import Header from './components/Header/Header';
import Drawer from './components/Drawer/Drawer';
import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AppContext from './context';
import Orders from './pages/Orders';
import { API_URL, CART_URL, FAV_URL } from './urls';

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
            try {
                const [cartResponse, favoritesResponse, itemsResponse] =
                    await Promise.all([
                        axios.get(CART_URL),
                        axios.get(FAV_URL),
                        axios.get(API_URL),
                    ]);

                setCartItems(cartResponse.data);
                setFavorites(favoritesResponse.data);
                setItems(itemsResponse.data);
                setTimeout(() => {
                    setIsLoading(false);
                }, 500);
            } catch (error) {
                alert('Ошибка запроса к серверу ' + error.message);
            }
        }
        fetchData();
    }, []);

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const onAddToCart = async (obj) => {
        try {
            const finditem = cartItems.find(
                (itemObj) => +itemObj.parentId === +obj.id
            );
            if (finditem) {
                setCartItems((prev) =>
                    prev.filter((item) => +item.parentId !== +obj.id)
                );
                axios.delete(`${CART_URL}/${finditem.id}`);
            } else {
                setCartItems((prev) => [...prev, obj]);
                const { data } = await axios.post(CART_URL, obj);
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return { ...item, id: data.id };
                        } else {
                            return item;
                        }
                    })
                );
            }
        } catch (error) {
            alert('Не удалось добавить в корзину ' + error.message);
        }
    };

    const onDeleteItem = (id) => {
        try {
            axios.delete(`${CART_URL}/${id}`);
            setCartItems((prev) => prev.filter((item) => +item.id !== +id));
        } catch (error) {
            alert('Не удалось удалить из корзины' + error.message);
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

    const isItemAdded = (id) => {
        return cartItems.some((obj) => +obj.parentId === +id);
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                favorites,
                isItemAdded,
                setCartOpened,
                onAddToCart,
                onAddFavorite,
                setCartItems,
            }}
        >
            <div className="wrapper clear">
                <Drawer
                    items={cartItems}
                    onDelete={onDeleteItem}
                    opened={cartOpened}
                />
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
                    <Route path="/orders" element={<Orders />}></Route>
                </Routes>
            </div>
        </AppContext.Provider>
    );
}

export default App;
