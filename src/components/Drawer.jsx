import React from 'react';

const Drawer = () => {
    return (
        <div style={{ display: 'none' }} className="overlay">
            <div className="drawer">
                <h2 className=" d-flex mb-30">
                    Корзина{' '}
                    <img className="close" src="/img/close.svg" alt="Remove" />
                </h2>
                <div className="items">
                    <div className="cartItem d-flex align-center">
                        <div
                            style={{
                                backgroundImage: 'url(/img/sneakers/1.jpeg)',
                            }}
                            className="cartItemImg"
                        ></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">
                                Мужские Кроссовки Nike Blazer Mid Suede
                            </p>
                            <b>12 999 руб.</b>
                        </div>
                        <img
                            className="close"
                            src="/img/close.svg"
                            alt="Remove"
                        />
                    </div>

                    <div className="cartItem d-flex align-center">
                        <div
                            style={{
                                backgroundImage: 'url(/img/sneakers/1.jpeg)',
                            }}
                            className="cartItemImg"
                        ></div>
                        <div className="mr-20 flex">
                            <p className="mb-5">
                                Мужские Кроссовки Nike Blazer Mid Suede
                            </p>
                            <b>12 999 руб.</b>
                        </div>
                        <img
                            className="close"
                            src="/img/close.svg"
                            alt="Remove"
                        />
                    </div>
                </div>
                <div className="cartTotalBlock">
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
                    <button className="greenButton">
                        Оформить заказ
                        <img src="/img/arrow-right.svg" alt="Arrow" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Drawer;
