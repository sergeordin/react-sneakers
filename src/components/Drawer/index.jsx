import styles from './Drawer.module.scss';

const Drawer = ({ onCloseCart, onDelete, items = [] }) => {
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

                {items.length > 0 ? (
                    <>
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
                            <button className={styles.greenButton}>
                                Оформить заказ
                                <img src="/img/arrow-right.svg" alt="Arrow" />
                            </button>
                        </div>
                    </>
                ) : (
                    <div
                        className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}
                    >
                        <img
                            className="mb-20"
                            width="120px"
                            height="120px"
                            src="/img/cart-empty.jpeg"
                            alt="Empty"
                        />
                        <h2>Корзина пустая</h2>
                        <p className="opacity-6">
                            Добавьте хотя бы одну пару кроссовок, чтобы сделать
                            заказ.
                        </p>
                        <button
                            onClick={onCloseCart}
                            className={styles.greenButton}
                        >
                            <img src="/img/arrow-right.svg" alt="Arrow" />
                            Вернуться назад
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Drawer;
