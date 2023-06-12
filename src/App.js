import Header from './components/Header';
import Drawer from './components/Drawer';
import Card from './components/Card';

const sneakers = [
    {
        id: 1,
        name: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 12999,
        img: '/img/sneakers/1.jpeg',
    },
    {
        id: 2,
        name: 'Мужские Кроссовки Nike Air Max 270',
        price: 15999,
        img: '/img/sneakers/2.jpeg',
    },
    {
        id: 3,
        name: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 8499,
        img: '/img/sneakers/3.jpeg',
    },
    {
        id: 4,
        name: 'Кроссовки Puma X Aka Boku Future Rider',
        price: 8999,
        img: '/img/sneakers/4.jpeg',
    },
    {
        id: 5,
        name: 'Мужские Кроссовки Under Armour Curry 8',
        price: 15199,
        img: '/img/sneakers/5.jpeg',
    },
    {
        id: 6,
        name: 'Мужские Кроссовки Nike Kyrie 7',
        price: 11299,
        img: '/img/sneakers/6.jpeg',
    },
    {
        id: 7,
        name: 'Мужские Кроссовки Jordan Air Jordan 11',
        price: 13999,
        img: '/img/sneakers/7.jpeg',
    },
    {
        id: 8,
        name: 'Мужские Кроссовки Nike LeBron XVIII',
        price: 16499,
        img: '/img/sneakers/8.jpeg',
    },
    {
        id: 9,
        name: 'Мужские Кроссовки Nike Lebron XVIII Low',
        price: 13999,
        img: '/img/sneakers/9.jpeg',
    },
    {
        id: 10,
        name: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 8499,
        img: '/img/sneakers/10.jpeg',
    },
    {
        id: 11,
        name: 'Кроссовки Puma X Aka Boku Future Rider',
        price: 8999,
        img: '/img/sneakers/11.jpeg',
    },
    {
        id: 12,
        name: 'Мужские Кроссовки Nike Kyrie Flytrap IV',
        price: 11299,
        img: '/img/sneakers/12.jpeg',
    },
];

function App() {
    return (
        <div className="wrapper clear">
            <Drawer />
            <Header />
            <div className="content p-40">
                <div className="d-flex align-center justify-between mb-40">
                    <h1>Все кроссовки</h1>
                    <div className="search-block d-flex">
                        <img src="/img/search.svg" alt="Search" />
                        <input type="text" placeholder="Поиск..." />
                    </div>
                </div>
                <div className="sneakers d-flex">
                    {sneakers.map((i) => (
                        <Card
                            key={i.id}
                            name={i.name}
                            price={i.price}
                            img={i.img}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
