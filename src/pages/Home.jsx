import { Layout, Card, Space, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useApiContext } from 'store/ApiContext';

const { Title } = Typography;
const { Meta } = Card;
const { Content } = Layout;

const Home = () => {
    const [fileData, setFileData] = useState([]);
    const apiContext = useApiContext();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const configFolder = '/config';
                const files = [
                    'RickAndMortyApi.json',
                    'RickAndMortyGraphQL.json',
                    'StarWarsApi.json',
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
        apiContext.setAppName(content.appName);
        apiContext.setConfig(content);
    };

    return (
        <Layout style={{ padding: '0 50px' }}>
            <Title style={{ textAlign: 'center', marginBottom: '100px', marginTop: '100px' }}>
                Choose an api to browse the content
            </Title>
            <Content style={{ padding: '20px', backgroundColor: '#fff' }}>
                <Space direction="horizontal" size={16}>
                    {fileData.map((file, index) => (
                        <Card
                            hoverable
                            style={{ width: 240 }}
                            key={index}
                            onClick={() => handleClick(file.content)}
                            cover={<img alt={file.content.appName} src={file.content.mainImage} />}
                        >
                            <Meta title={file.content.appName} description={file.content.apiType} />
                        </Card>
                    ))}
                </Space>
            </Content>
        </Layout>
    );
};

export default Home;
