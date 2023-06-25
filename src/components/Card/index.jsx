import { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({
    id,
    name,
    price,
    img,
    onFavorite,
    onPlus,
    favorited = false,
}) => {
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickPlus = () => {
        onPlus({ id, name, img, price });
        setIsAdded(!isAdded);
    };

    const onClickFavorite = () => {
        onFavorite({ id, name, img, price });
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img
                    onClick={onClickFavorite}
                    src={
                        isFavorite
                            ? '/img/heart-liked.svg'
                            : '/img/heart-unliked.svg'
                    }
                    alt="Favorite"
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
                    onClick={onClickPlus}
                />
            </div>
        </div>
    );
};

export default Card;
