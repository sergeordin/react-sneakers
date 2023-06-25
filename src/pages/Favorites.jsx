import React from 'react';
import Card from '../components/Card';

const Favorites = ({ items, onAddFavorite }) => {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>Мои закладки</h1>
            </div>
            <div className="sneakers d-flex">
                {items.map((i) => (
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
