import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Col, Container, Form, Row } from "reactstrap";
import InfiniteList from "../../Components/InfiniteList";
import messages from "../../Translations/es.json";
import "./Assets/Sass/styles.scss";

const Locations = () => {
    const [query, setQuery] = useState("");
    const searchPlaceholder = messages["app.search"];

    const handleChange = event => {
        setQuery(event.target.value);
    };

    return (
        <Container className='locations'>
            <Row>
                <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
                    <h2 className='mb-5'>
                        <FormattedMessage
                            id='app.locations'
                            defaultMessage='Locations'
                        />
                    </h2>
                    <Form className='search-form'>
                        <input
                            id='filter-user'
                            placeholder={searchPlaceholder}
                            onChange={handleChange}
                            value={query}
                        />
                    </Form>
                    <InfiniteList type='location' query={query} />
                </Col>
            </Row>
        </Container>
    );
};

export default Locations;
