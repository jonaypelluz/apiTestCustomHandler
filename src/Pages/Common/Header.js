import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import {
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarToggler,
    NavItem,
} from "reactstrap";
import logo from "./Assets/Images/RickAndMorty.png";
import "./Assets/Sass/styles.scss";

class Header extends Component {
    capitalize = s => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    render() {
        const { user, isLoading } = this.props;
        return (
            <div id='header' className='header mb-5'>
                <Container>
                    <Navbar light expand='md'>
                        <Link className='navbar-brand' to='/'>
                            <img
                                src={logo}
                                alt={process.env.REACT_APP_NAME}
                                className='img-fluid'
                            />
                        </Link>
                        <NavbarToggler onClick={this.props.toggleCollapse} />
                        <Collapse isOpen={this.props.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <NavItem>
                                    {!isLoading && user ? (
                                        <Link
                                            className='nav-link'
                                            to='/profile'>
                                            <FormattedMessage
                                                id='app.profile'
                                                defaultMessage='Profile'
                                            />
                                        </Link>
                                    ) : (
                                        <Link className='nav-link' to='/login'>
                                            <FormattedMessage
                                                id='app.login'
                                                defaultMessage='Login'
                                            />
                                        </Link>
                                    )}
                                </NavItem>
                                <NavItem>
                                    <Link className='nav-link' to='/characters'>
                                        <FormattedMessage
                                            id='app.characters'
                                            defaultMessage='Characters'
                                        />
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link className='nav-link' to='/locations'>
                                        <FormattedMessage
                                            id='app.locations'
                                            defaultMessage='Locations'
                                        />
                                    </Link>
                                </NavItem>
                                <NavItem>
                                    <Link className='nav-link' to='/episodes'>
                                        <FormattedMessage
                                            id='app.episodes'
                                            defaultMessage='Episodes'
                                        />
                                    </Link>
                                </NavItem>
                                {user ? (
                                    <NavItem>
                                        <Link className='nav-link' to='/logout'>
                                            <i className='fas fa-sign-out-alt' />
                                        </Link>
                                    </NavItem>
                                ) : (
                                    ""
                                )}
                            </Nav>
                        </Collapse>
                    </Navbar>
                </Container>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { authentication } = state;
    const { isLoading, user } = authentication;
    return {
        isLoading,
        user,
    };
}

export default connect(mapStateToProps)(Header);
