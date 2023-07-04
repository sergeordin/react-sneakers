import React from 'react';
import Card from '../components/Card/Card';
import ContentLoader from 'react-content-loader';

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
                {items
                    .filter((item) =>
                        item.name
                            .toLowerCase()
                            .includes(searchValue.toLocaleLowerCase())
                    )
                    .map((item) =>
                        isLoading ? (
                            <ContentLoader
                                speed={2}
                                width={150}
                                height={265}
                                viewBox="0 0 150 265"
                                backgroundColor="#ededed"
                                foregroundColor="#ecebeb"
                                key={item.id}
                            >
                                <rect
                                    x="0"
                                    y="0"
                                    rx="7"
                                    ry="7"
                                    width="150"
                                    height="90"
                                />
                                <rect
                                    x="0"
                                    y="100"
                                    rx="7"
                                    ry="7"
                                    width="150"
                                    height="15"
                                />
                                <rect
                                    x="0"
                                    y="126"
                                    rx="7"
                                    ry="7"
                                    width="100"
                                    height="15"
                                />
                                <rect
                                    x="0"
                                    y="172"
                                    rx="7"
                                    ry="7"
                                    width="80"
                                    height="24"
                                />
                                <rect
                                    x="116"
                                    y="164"
                                    rx="10"
                                    ry="10"
                                    width="32"
                                    height="32"
                                />
                            </ContentLoader>
                        ) : (
                            <Card
                                key={item.id}
                                onPlus={(obj) => onAddToCart(obj)}
                                onFavorite={(obj) => onAddFavorite(obj)}
                                {...item}
                            />
                        )
                    )}
            </div>
        </div>
    );
};

export default Home;
