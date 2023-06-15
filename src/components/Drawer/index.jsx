import styles from './Drawer.module.scss';

const Drawer = ({ onCloseCart, deleteItem, items = [] }) => {
    return (
        <div className={styles.overlay}>
            <div className={styles.drawer}>
                <h2 className=" d-flex mb-30">
                    Корзина{' '}
                    <img
                        onClick={onCloseCart}
                        className={styles.close}
                        src="/img/close.svg"
                        alt="Remove"
                    />
                </h2>

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
                                onClick={() => deleteItem(i)}
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
                    <button className={styles.greenButton}>
                        Оформить заказ
                        <img src="/img/arrow-right.svg" alt="Arrow" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
