import { useEffect, useState } from 'react';
import styles from './Card.module.scss';

const Card = ({ name, price, img, onFavorite, onPlus }) => {
    const [isAdded, setIsAdded] = useState(false);

    const onClickHandle = () => {
        onPlus({ name, img, price });
        setIsAdded(!isAdded);
    };

    useEffect(() => {}, [isAdded]);

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img
                    onClick={() => ''}
                    src="/img/heart-unliked.svg"
                    alt="unliked"
                />
            </div>

            <img width={133} height={112} src={img} alt={name} />
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                <img
                    className={styles.plus}
                    src={isAdded ? '/img/btn-checked.svg' : '/img/btn-plus.svg'}
                    alt="Plus"
                    onClick={onClickHandle}
                />
            </div>
        </div>
    );
};

export default Card;
