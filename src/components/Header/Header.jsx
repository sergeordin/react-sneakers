import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AppContext from '../../context';
import { useCart } from '../../hooks/useCart';

const Header = () => {
    const { setCartOpened } = useContext(AppContext);
    const { totalPrice } = useCart();

    return (
        <header className="d-flex justify-between align-center p-40">
            <Link to="/">
                <div className="d-flex align-center">
                    <img
                        width={40}
                        height={40}
                        src="/img/logo.png"
                        alt="logo"
                    />
                    <div>
                        <h3 className="text-uppercase">React Sneakers</h3>
                        <p className="opacity-5">Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className="d-flex">
                <li className="mr-30 cu-p" onClick={() => setCartOpened(true)}>
                    <img
                        width={18}
                        height={18}
                        src="/img/cart.svg"
                        alt="Сart"
                    />
                    <span>{totalPrice} p.</span>
                </li>
                <li>
                    <Link to="favorites">
                        <img
                            className=" mr-20 cu-p"
                            width={18}
                            height={18}
                            src="/img/favorite.svg"
                            alt="Favorite"
                        />
                    </Link>
                </li>
                <li>
                    <Link to="orders">
                        <img
                            className="cu-p"
                            width={18}
                            height={18}
                            src="/img/profile.svg"
                            alt="Profile"
                        />
                    </Link>
                </li>
            </ul>
        </header>
    );
};

export default Header;
