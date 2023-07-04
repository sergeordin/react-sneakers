import Info from './Info';
import styles from './Drawer.module.scss';
import AppContext from '../../context';
import { useContext, useState } from 'react';
import axios from 'axios';
import { CART_URL, ORDERS_URL } from '../../App';

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

const Drawer = ({ onDelete, items = [] }) => {
    const { cartItems, setCartOpened, setCartItems } = useContext(AppContext);

    const [isOrderCompleted, setIsOrderCompleted] = useState();
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const onClickOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(ORDERS_URL, {
                items: cartItems,
            });
            setOrderId(data.id);
            setIsOrderCompleted(true);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(`${CART_URL}/${item.id}`);
                await delay(1000);
            }
        } catch (error) {
            alert('Ошибка оформления заказа ' + error.message);
        }
        setIsLoading(false);
    };

    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className=" d-flex mb-30">
                    Корзина{' '}
                    <img
                        onClick={() => setCartOpened(false)}
                        className={styles.close}
                        src="/img/close.svg"
                        alt="Remove"
                    />
                </h2>

                {items.length > 0 ? (
                    <div className="d-flex flex-column flex">
                        <div className={styles.items}>
                            {items.map((i) => (
                                <div
                                    key={i.id}
                                    className={`${styles.cartItem} cartItem d-flex align-center`}
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${i.img})`,
                                        }}
                                        className={styles.cartItemImg}
                                    ></div>
                                    <div className="mr-20 flex">
                                        <p className="mb-5">{i.name}</p>
                                        <b>{i.price} руб.</b>
                                    </div>
                                    <img
                                        className={styles.close}
                                        src="/img/close.svg"
                                        alt="Remove"
                                        onClick={() => onDelete(i.id)}
                                    />
                                </div>
                            ))}
                        </div>
                        <div className={styles.cartTotalBlock}>
                            <ul>
                                <li>
                                    <span>Итого</span>
                                    <div></div>
                                    <b>21 498 руб.</b>
                                </li>
                                <li>
                                    <span>Налог 5%</span>
                                    <div></div>
                                    <b>1074 руб.</b>
                                </li>
                            </ul>
                            <button
                                className={styles.greenButton}
                                onClick={onClickOrder}
                                disabled={isLoading}
                            >
                                Оформить заказ
                                <img src="/img/arrow-right.svg" alt="Arrow" />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={
                            isOrderCompleted
                                ? 'Заказ оформлен!'
                                : 'Корзина пустая'
                        }
                        image={
                            isOrderCompleted
                                ? '/img/ordered.jpeg'
                                : '/img/cart-empty.jpeg'
                        }
                        desciption={
                            isOrderCompleted
                                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.'
                        }
                    />
                )}
            </div>
        </div>
    );
};

export default Drawer;
