import React from 'react';
import Card from '../components/Card';

const Home = ({
    items,
    searchValue,
    setSearchValue,
    onChangeSearchInput,
    onAddFavorite,
    onAddToCart,
    isLoading,
}) => {
    return (
        <div className="content p-40">
            <div className="d-flex align-center justify-between mb-40">
                <h1>
                    {searchValue
                        ? `Поиск по запросу: ${searchValue}`
                        : `Все кроссовки`}
                </h1>
                <div className="search-block d-flex">
                    <img src="/img/search.svg" alt="Search" />
                    {searchValue && (
                        <img
                            className="clear cu-p"
                            src="/img/close.svg"
                            alt="Clear"
                            onClick={() => setSearchValue('')}
                        />
                    )}

                    <input
                        type="text"
                        placeholder="Поиск..."
                        value={searchValue}
                        onChange={onChangeSearchInput}
                    />
                </div>
            </div>
            <div className="sneakers d-flex">
                {isLoading ? (
                    <h2>Загрузка...</h2>
                ) : (
                    items
                        .filter((item) =>
                            item.name
                                .toLowerCase()
                                .includes(searchValue.toLocaleLowerCase())
                        )
                        .map((i) => (
                            <Card
                                key={i.id}
                                onPlus={() => onAddToCart(i)}
                                onFavorite={() => onAddFavorite(i)}
                                favorited={false}
                                {...i}
                            />
                        ))
                )}
            </div>
        </div>
    );
};

export default Home;
