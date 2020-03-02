import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { Route, Router, Switch } from "react-router-dom";
import { Alert, Col, Container, Row } from "reactstrap";
import { AlertActions } from "../Actions";
import { PrivateRoute } from "../Components";
import { history } from "../Helpers";
import { Login, Logout } from "../Pages/Auth";
import { Character, Characters } from "../Pages/Character";
import { Header, Home, NotFound } from "../Pages/Common";
import { Episode, Episodes } from "../Pages/Episode";
import { Location, Locations } from "../Pages/Location";
import { Profile } from "../Pages/Profile";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
        };

        const { dispatch } = this.props;

        // Clear alert on location change
        history.listen((location, action) => {
            dispatch(AlertActions.clear());
        });
    }

    toggleCollapse = () => {
        if (this.state.isOpen) {
            this.setState({ isOpen: false });
        } else {
            this.setState({ isOpen: true });
        }
    };

    render() {
        const { alert } = this.props;
        return (
            <Fragment>
                <Router history={history}>
                    <Header
                        toggleCollapse={this.toggleCollapse}
                        isOpen={this.state.isOpen}
                    />
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/login' component={Login} />
                        <PrivateRoute path='/logout' component={Logout} />
                        <PrivateRoute path='/profile' component={Profile} />
                        <Route path='/characters' component={Characters} />
                        <Route path='/character/:id' component={Character} />
                        <Route path='/locations' component={Locations} />
                        <Route path='/location/:id' component={Location} />
                        <Route path='/episodes' component={Episodes} />
                        <Route path='/episode/:id' component={Episode} />
                        <Route component={NotFound} />
                    </Switch>
                </Router>

                {alert.message && (
                    <Container>
                        <Row>
                            {this.props.user ? (
                                <Col>
                                    <Alert color={alert.type}>
                                        {alert.message}
                                    </Alert>
                                </Col>
                            ) : (
                                <Col
                                    className='mb-3'
                                    md={{ size: 6, offset: 3 }}>
                                    <Alert color={alert.type}>
                                        {alert.message}
                                    </Alert>
                                </Col>
                            )}
                        </Row>
                    </Container>
                )}
            </Fragment>
        );
    }
}

function mapStateToProps(state) {
    const { alert, authentication } = state;
    const { user } = authentication;
    return {
        alert,
        user,
    };
}

export default connect(mapStateToProps)(App);
