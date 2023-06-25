import { Link } from 'react-router-dom';

const Header = ({ onClickCart }) => {
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
                <li className="mr-30 cu-p" onClick={onClickCart}>
                    <img
                        width={18}
                        height={18}
                        src="/img/cart.svg"
                        alt="Сart"
                    />
                    <span>0 p.</span>
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
                    <img
                        className="cu-p"
                        width={18}
                        height={18}
                        src="/img/profile.svg"
                        alt="Profile"
                    />
                </li>
            </ul>
        </header>
    );
};

export default Header;
