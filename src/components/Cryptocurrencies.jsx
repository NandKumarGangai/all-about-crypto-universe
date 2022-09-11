import millify from 'millify';
import { Link } from 'react-router-dom';
import { Card, Row, Col, Input } from 'antd';

import { useGetCryptosQuery } from '../services/cryptoApi';
import React from 'react';

const Cryptocurrencies = ({ simplified }) => {
    const count = simplified ? 10 : 100;
    const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
    const [cryptos, setCryptos] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState('');

    React.useEffect(() => {
        // setCryptos(cryptosList?.data?.coins);
        const filtredData = cryptosList?.data?.coins.filter((coin) => coin.name.toLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setCryptos(filtredData);
    }, [cryptosList, searchTerm]);

    if (isFetching) return 'Loading....';

    return (
        <>
            {
                !simplified &&
                <div className="search-crypto">
                    <Input placeholder="Search Cryptocurrency" onChange={e => setSearchTerm(e.target.value)}></Input>
                </div>
            }
            <Row gutter={[32, 32]} className="crypto-card-container">
                {cryptos?.map((currency, idx) => (
                    <Col xs={24} sm={12} lg={6} className="crypto-card" key={`${currency.id}-${idx}`}>
                        <Link key={currency.id} to={`/crypto/${currency.id}`}>
                            <Card title={`${currency.rank}. ${currency.name}`} extra={<img className="crypto-image" src={currency.iconUrl} alt="" />} hoverable>
                                <p>Price: {millify(currency.price)}</p>
                                <p>Market Cap: {millify(currency.marketCap)}</p>
                                <p>Daily Change: {currency.change}%</p>
                            </Card>
                        </Link>
                    </Col>
                ))}
            </Row>
        </>
    )
}

export default Cryptocurrencies;
