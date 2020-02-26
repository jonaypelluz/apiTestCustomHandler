import React, { Component } from "react";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { ProfileActions } from "../../Actions";
import "./Assets/Sass/styles.scss";

class Home extends Component {
    render() {
        const { isLoading } = this.props;
        return (
            <Container className='home'>
                <Row>
                    <Col sm={{ size: 6, offset: 3 }} className='text-center'>
                        {isLoading ? (
                            <i className='fa fa-spinner fa-spinner fa-spin' />
                        ) : (
                            <span>Hello world!</span>
                        )}
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default connect()(Home);
