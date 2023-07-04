import React, { useContext } from 'react';
import Card from '../components/Card/Card';
import AppContext from '../context';

const Favorites = () => {
    const { favorites, onAddFavorite } = useContext(AppContext);

    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="sneakers d-flex">
                {favorites.map((i) => (
                    <Card
                        key={i.id}
                        onFavorite={onAddFavorite}
                        favorited={true}
                        {...i}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites;
