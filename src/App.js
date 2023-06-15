import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';
import { useEffect, useState } from 'react';

function App() {
    const URL = 'https://64845437ee799e32162686ba.mockapi.io/sneakers';
    const [isLoading, setIsLoading] = useState(true);

    const [sneakers, setSneakers] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        fetch(URL)
            .then((data) => data.json())
            .then((items) => setSneakers(items))
            .catch((e) => alert('Ошибка загрузки данных: ' + e.message))
            .finally(setIsLoading(false));
    }, []);

    const onAddToCart = (obj) => {
        if (cartItems.includes(obj)) {
            return;
        } else setCartItems((prev) => [...prev, obj]);
    };

    const deleteFromCart = (obj) => {
        return cartItems.filter((i) => i !== obj);
    };

    return (
        <div className="wrapper clear">
            {cartOpened && (
                <Drawer
                    onCloseCart={() => setCartOpened(false)}
                    deleteItem={deleteFromCart}
                    items={cartItems}
                />
            )}
            <Header onClickCart={() => setCartOpened(true)} />
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search" />
                        <input type="text" placeholder="Поиск..." />
                    </div>
                </div>
                <div className="sneakers d-flex">
                    {isLoading ? (
                        <h2>Загрузка...</h2>
                    ) : (
                        sneakers.map((i) => (
                            <Card
                                key={i.id}
                                name={i.name}
                                price={i.price}
                                img={i.img}
                                onFavorite={''}
                                onPlus={() => onAddToCart(i)}
                            />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
}

export default App;
