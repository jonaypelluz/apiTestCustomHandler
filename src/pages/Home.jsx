import { Layout, Card, Col, Row, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConfig } from 'reducers/ApiReducer';

const { Title } = Typography;
const { Meta } = Card;
const { Content } = Layout;

const Home = () => {
    const dispatch = useDispatch();
    const { appName } = useSelector((state) => state.apiConfig);
    const [fileData, setFileData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const configFolder = '/config';
                const files = [
                    'HarryPotterApi.json',
                    'PokemonApi.json',
                    'RickAndMortyGraphQL.json',
                    'StarWarsApi.json',
                    'RickAndMortyApi.json',
                    // 'ArtInstituteOfChicago.json',
                ];
                const dataPromises = files.map(async (fileName) => {
                    const fileResponse = await fetch(`${configFolder}/${fileName}`);
                    const fileContent = await fileResponse.json();
                    return { name: fileName, content: fileContent };
                });

                const fileData = await Promise.all(dataPromises);

                setFileData(fileData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const handleClick = (content) => {
        dispatch(setConfig(content));
    };

    return (
        <Layout style={{ padding: '0 50px' }}>
            <Title style={{ textAlign: 'center', marginBottom: '100px', marginTop: '100px' }}>
                CraftAPIxplorer - Choose an api to browse the content
            </Title>
            <Content style={{ padding: '20px', backgroundColor: '#fff' }}>
                <Row>
                    {fileData.map((file, idx) => (
                        <Col style={{ margin: '10px' }} key={idx}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                className={
                                    appName === file.content.appName
                                        ? 'home-card selected-card'
                                        : 'home-card'
                                }
                                onClick={() => handleClick(file.content)}
                                cover={
                                    <img alt={file.content.appName} src={file.content.mainImage} />
                                }
                            >
                                <Meta
                                    title={file.content.appName}
                                    description={file.content.apiType}
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Content>
        </Layout>
    );
};

export default Home;
