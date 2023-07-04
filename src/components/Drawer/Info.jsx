import { useContext } from 'react';
import styles from './Drawer.module.scss';
import AppContext from '../../context';

const Info = ({ title, image, desciption }) => {
    const { setCartOpened } = useContext(AppContext);
    return (
        <div
            className={`${styles.cartEmpty} d-flex align-center justify-center flex-column flex`}
        >
            <img className="mb-20" width="120px" src={image} alt="Empty" />
            <h2>{title}</h2>
            <p className="opacity-6">{desciption}</p>
            <button
                onClick={() => setCartOpened(false)}
                className={styles.greenButton}
            >
                <img src="/img/arrow-right.svg" alt="Arrow" />
                Вернуться назад
            </button>
        </div>
    );
};

export default Info;
