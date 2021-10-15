import React from 'react';
import { Select, Typography, Row, Col, Avatar, Card } from 'antd';
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';

const { Text, Title } = Typography;
const { Option } = Select;

const News = ({ simplified }) => {
    const [newsCategory, setNewsCategory] = React.useState('Cryptocurrency');
    const { data: cryptoNews } = useGetCryptoNewsQuery({ newsCategory, count: simplified ? 10 : 100 });
    const { data } = useGetCryptosQuery(100);
    if (!cryptoNews?.value) {
        return 'Loading....'
    }
    console.log('----', cryptoNews)
    return (
        <Row gutter={[24, 24]}>
            {
                !simplified && (
                    <Col span={24}>
                        <Select
                            showSearch
                            className="select-news"
                            placeholder="Select a Crypto"
                            optionFilterProp="children"
                            onChange={value => setNewsCategory(value)}
                            filterOption={(input, option) => option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            <Option value="Cryptocurrency">
                                Cryptocurrency
                            </Option>
                            {
                                data?.data?.coins?.map( coin => <Option value={coin.name} key={coin.name}>{coin.name}</Option>)
                            }
                        </Select>
                    </Col>
                )
            }
            {cryptoNews?.value?.map((news, idx) => (
                <Col xs={24} sm={12} lg={6} key={idx}>
                    <Card className="news-card" hoverable>
                        <a href={news.url} target="_blank" rel="noreferrer">
                            <div className="news-image-container">
                                <Title className="news-title" level={5}>
                                    {news?.name}
                                </Title>
                                <img style={{ maxWidth: '200px', maxHeight: '100px' }} src={news?.image?.thumbnail?.contentUrl} alt={news?.name}></img>
                            </div>
                            <p>
                                {
                                    news?.description?.length > 100 ? `${news?.description?.substring(0, 100)} ...` : news?.description
                                }
                            </p>
                            <div className="provider-container">
                                <div>
                                    <Avatar src={news?.provider[0]?.image?.thumbnail?.contentUrl} alt={news?.name}></Avatar>
                                    <Text className="provider-name">{news?.provider[0]?.name}</Text>
                                </div>
                                <Text>{moment(news?.datePublished).startOf('ss').fromNow()}</Text>
                            </div>
                        </a>
                    </Card>
                </Col>
            ))}
        </Row>
    )
}

export default News
