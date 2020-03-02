import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { item as fetchItem } from "../../Services/ApiServices";
import "./Assets/Sass/styles.scss";

const Location = () => {
    const { id } = useParams();
    const [location, setLocation] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            fetchItem("location", id).then(response => {
                if (response) {
                    setLocation(response);
                }
            });
        };
        if (location === false) {
            fetchData();
        }
    }, [id, location]);

    return (
        <Container className='locations'>
            <Row>
                <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
                    <h2 className='mb-5'>
                        <FormattedMessage
                            id='app.location'
                            defaultMessage='Location'
                        />
                    </h2>
                    {location && (
                        <article key={location.id} className='item-wrapper'>
                            <div className='item-content'>
                                <h3 className='item-title'>{location.name}</h3>
                                <p className='item-text'>
                                    <b>
                                        <FormattedMessage
                                            id='app.type'
                                            defaultMessage='Type'
                                        />
                                        :
                                    </b>{" "}
                                    {location.type}
                                    <br />
                                    <b>
                                        <FormattedMessage
                                            id='app.dimension'
                                            defaultMessage='Dimension'
                                        />
                                        :
                                    </b>{" "}
                                    {location.dimension}
                                </p>
                            </div>
                        </article>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Location;
