import React, { useState } from "react";
import { FormattedMessage } from "react-intl";
import { Col, Container, Row, Form } from "reactstrap";
import InfiniteList from "../../Components/InfiniteList";
import messages from "../../Translations/es.json";
import "./Assets/Sass/styles.scss";

const Episodes = () => {
    const [query, setQuery] = useState("");
    const searchPlaceholder = messages["app.search"];

    const handleChange = event => {
        setQuery(event.target.value);
    };

    return (
        <Container className='episodes'>
            <Row>
                <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
                    <h2 className='mb-5'>
                        <FormattedMessage
                            id='app.episodes'
                            defaultMessage='Episodes'
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
                    <InfiniteList type='episode' query={query} />
                </Col>
            </Row>
        </Container>
    );
};

export default Episodes;
