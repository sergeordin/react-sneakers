import { useContext, useState } from 'react';
import styles from './Card.module.scss';
import AppContext from '../../context';

const Card = ({
    id,
    name,
    price,
    img,
    onFavorite,
    onPlus,
    favorited = false,
}) => {
    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);
    const itemObj = { id, parentId: id, name, img, price };

    const onClickPlus = () => {
        onPlus(itemObj);
    };

    const onClickFavorite = () => {
        onFavorite(itemObj);
        setIsFavorite(!isFavorite);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                {onFavorite && (
                    <img
                        onClick={onClickFavorite}
                        src={
                            isFavorite
                                ? '/img/heart-liked.svg'
                                : '/img/heart-unliked.svg'
                        }
                        alt="Favorite"
                    />
                )}
            </div>

            <img width="100%" height={135} src={img} alt={name} />
            <h5>{name}</h5>
            <div className="d-flex justify-between align-center">
                <div className="d-flex flex-column">
                    <span>Цена:</span>
                    <b>{price} руб.</b>
                </div>
                {onPlus && (
                    <img
                        className={styles.plus}
                        src={
                            isItemAdded(id)
                                ? '/img/btn-checked.svg'
                                : '/img/btn-plus.svg'
                        }
                        alt="Plus"
                        onClick={onClickPlus}
                    />
                )}
            </div>
        </div>
    );
};

export default Card;
