import React, { useEffect, useState } from 'react';
import Card from '../components/Card/Card';
import { ORDERS_URL } from '../urls';
import axios from 'axios';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setIsLoading(true);
            try {
                const { data } = await axios.get(ORDERS_URL);
                const ordersList = data.map((obj) => obj.items).flat();
                setOrders(ordersList);
            } catch (error) {
                alert('Ошибка загрузки заказов ' + error.message);
            }
            setIsLoading(false);
        })();
    }, []);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои заказы</h1>
            </div>
            <div className="sneakers d-flex">
                {isLoading
                    ? `Загрузка`
                    : orders.map((item, index) => (
                          <Card key={index} {...item} />
                      ))}
            </div>
        </div>
    );
};

export default Orders;
