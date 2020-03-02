import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import home from "./Assets/Images/home.png";
import "./Assets/Sass/styles.scss";

class Home extends Component {
    render() {
        const { isLoading } = this.props;
        return (
            <Container className='home'>
                <Row>
                    <Col sm={{ size: 8, offset: 2 }} className='text-center'>
                        {isLoading ? (
                            <i className='fa fa-spinner fa-spinner fa-spin' />
                        ) : (
                            <img
                                src={home}
                                alt={process.env.REACT_APP_NAME}
                                className='img-fluid'
                            />
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect()(Home);
