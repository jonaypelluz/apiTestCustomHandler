import React, { Component, Fragment } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import {
    Collapse,
    Container,
    Nav,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
} from "reactstrap";
import logo from "./Assets/Images/RickAndMorty.png";
import "./Assets/Sass/styles.scss";

class Header extends Component {
    capitalize = s => {
        if (typeof s !== "string") return "";
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    render() {
        const { user, isLoading, } = this.props;
        return (
            <div id='header' className='header mb-5'>
                <Container>
                    <Navbar light expand='md'>
                        <NavbarBrand href='/'>
                            <img
                                src={logo}
                                alt={process.env.REACT_APP_NAME}
                                className="img-fluid"
                            />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.props.toggleCollapse} />
                        <Collapse isOpen={this.props.isOpen} navbar>
                            <Nav className='ml-auto' navbar>
                                <Fragment>
                                    <NavItem>
                                        {
                                            !isLoading && user
                                            ?
                                            (<NavLink href='/profile'>
                                                <FormattedMessage
                                                    id='app.profile'
                                                    defaultMessage='Profile'
                                                />
                                            </NavLink>) : 
                                            (<NavLink href='/login'>
                                                <FormattedMessage
                                                    id='app.login'
                                                    defaultMessage='Login'
                                                />
                                            </NavLink>) 
                                        }
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href='/characters'>
                                            <FormattedMessage
                                                id='app.characters'
                                                defaultMessage='Characters'
                                            />
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href='/locations'>
                                            <FormattedMessage
                                                id='app.locations'
                                                defaultMessage='Locations'
                                            />
                                        </NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink href='/episodes'>
                                            <FormattedMessage
                                                id='app.episodes'
                                                defaultMessage='Episodes'
                                            />
                                        </NavLink>
                                    </NavItem>
                                    { user ? (
                                    <NavItem>
                                        <NavLink href='/logout'>
                                            <i className='fas fa-sign-out-alt' />
                                        </NavLink>
                                    </NavItem>
                                    ) : ''}
                                </Fragment>
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
