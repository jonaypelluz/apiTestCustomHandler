import React, { useEffect, useState } from "react";
import { FormattedMessage } from "react-intl";
import { useParams } from "react-router-dom";
import { Col, Container, Row } from "reactstrap";
import { item as fetchItem } from "../../Services/ApiServices";
import "./Assets/Sass/styles.scss";

const Character = () => {
    let { id } = useParams();
    const [character, setCharacter] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            fetchItem("character", id).then(response => {
                if (response) {
                    setCharacter(response);
                }
            });
        };
        if (character === false) {
            fetchData();
        }
    }, [character, id]);

    return (
        <Container className='characters'>
            <Row>
                <Col sm={{ size: 10, offset: 1 }} md={{ size: 6, offset: 3 }}>
                    <h2 className='mb-5'>
                        <FormattedMessage
                            id='app.character'
                            defaultMessage='Character'
                        />
                    </h2>
                    {character && (
                        <article key={character.id} className='item-wrapper'>
                            <div className='item-content'>
                                <img
                                    src={character.image}
                                    className='img-fluid'
                                    alt={character.name}
                                />
                                <h3 className='item-title'>{character.name}</h3>
                                <p className='item-text'>
                                    <b>
                                        <FormattedMessage
                                            id='app.species'
                                            defaultMessage='Species'
                                        />
                                        :
                                    </b>{" "}
                                    {character.species}
                                    <br />
                                    <b>
                                        <FormattedMessage
                                            id='app.gender'
                                            defaultMessage='Gender'
                                        />
                                        :
                                    </b>{" "}
                                    {character.gender}
                                    <br />
                                    <b>
                                        <FormattedMessage
                                            id='app.location'
                                            defaultMessage='Location'
                                        />
                                        :
                                    </b>{" "}
                                    {character.location.name}
                                </p>
                            </div>
                        </article>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default Character;
