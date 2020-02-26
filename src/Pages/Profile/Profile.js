import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Col, Container, Row } from "reactstrap";
import { ProfileActions } from "../../Actions";
import "./Assets/Sass/styles.scss";

class Profile extends Component {

    state = {
        profile: false,
    }

    componentDidMount() {
        let profile = JSON.parse(sessionStorage.getItem("profile"));
        if (profile === null) {
            this.props.getProfile();
        } else {
            this.setState({ profile: JSON.parse(sessionStorage.getItem("profile"))});
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.profile !== this.props.profile && this.props.profile !== false){
            this.setState({ profile: JSON.parse(sessionStorage.getItem("profile"))});
        }
    }

    render() {
        const { isLoading } = this.props;
        const { profile } = this.state;
        return (
            <Container className='profile'>
                <Row>
                    { isLoading  ?  <i className='fa fa-spinner fa-spinner fa-spin' /> : '' }
                    { profile !== false ?  (
                    <Col
                        sm={{ size: 10, offset: 1 }}
                        md={{ size: 6, offset: 3 }}
                        className='text-center'>
                        <h2 className='mb-5 text-uppercase'>
                            <FormattedMessage
                                id='app.profile'
                                defaultMessage='Profile'
                            />
                        </h2>
                        <b>
                            <FormattedMessage
                                id='app.username'
                                defaultMessage='Username'
                            />
                            :
                        </b>{" "}
                        {profile.name}
                        <br />
                        <b>
                            <FormattedMessage
                                id='app.email'
                                defaultMessage='Email'
                            />
                            :
                        </b>{" "}
                        {profile.email}
                    </Col>
                    )
                    :
                    ''}
                </Row>
            </Container>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        getProfile: () => dispatch(ProfileActions.meAction()),
        dispatch,
    };
};

function mapStateToProps(state) {
    const { profile, isLoading } = state.me;
    return {
        profile,
        isLoading
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
