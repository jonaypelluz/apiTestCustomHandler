import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { item as fetchItem } from "../../Services/ApiServices";
import "./Assets/Sass/styles.scss";

const Episode = () => {
    let { id } = useParams();
    const [episode, setEpisode] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            fetchItem("episode", id).then(response => {
                if (response) {
                    setEpisode(response);
                }
            });
        };
        if (episode === false) {
            fetchData();
        }
    }, [episode, id]);

    return (
        <Container className='episodes'>
            <Row>
                <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
                    <h2 className='mb-5'>
                        <FormattedMessage
                            id='app.episode'
                            defaultMessage='Episode'
                        />
                    </h2>
                    {episode && (
                        <article key={episode.id} className='item-wrapper'>
                            <div className='item-content'>
                                <h3 className='item-title'>{episode.name}</h3>
                                <p className='item-text'>
                                    <b>
                                        <FormattedMessage
                                            id='app.airDate'
                                            defaultMessage='Air date'
                                        />
                                        :
                                    </b>{" "}
                                    {episode.air_date}
                                    <br />
                                    <b>
                                        <FormattedMessage
                                            id='app.episode'
                                            defaultMessage='Episode'
                                        />
                                        :
                                    </b>{" "}
                                    {episode.episode}
                                </p>
                            </div>
                        </article>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Episode;
