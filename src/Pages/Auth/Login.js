import React, { Component } from "react";
import { connect } from "react-redux";
import {
    Button,
    Col,
    Container,
    Form,
    FormGroup,
    Input,
    Label,
    Row,
} from "reactstrap";
import { AuthActions } from "../../Actions";
import "./Assets/Sass/styles.scss";
import { history } from "../../Helpers";

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            submitted: false,
        };

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        if (typeof this.props.user !== "undefined") {
            history.push("/");
        }
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    render() {
        const { isLoading } = this.props;
        const { email, password, submitted } = this.state;
        return (
            <Container className='login'>
                <Row>
                    <Col md={{ size: 6, offset: 3 }}>
                        <h2 className='mb-5 text-uppercase'>Login</h2>
                        <Form name='form' onSubmit={this.handleSubmit}>
                            <FormGroup
                                className={
                                    submitted && !email ? "has-error" : ""
                                }>
                                <Label for='email'>Email</Label>
                                <Input
                                    type='text'
                                    name='email'
                                    id='email'
                                    maxLength={125}
                                    placeholder='Your email'
                                    value={email}
                                    onChange={this.handleChange}
                                />
                                {submitted && !email && (
                                    <div className='help-block'>
                                        Username is required
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup
                                className={
                                    submitted && !password ? "has-error" : ""
                                }>
                                <Label for='password'>Password</Label>
                                <Input
                                    type='password'
                                    name='password'
                                    id='password'
                                    maxLength={125}
                                    placeholder='Your password'
                                    autoComplete='off'
                                    value={password}
                                    onChange={this.handleChange}
                                />
                                {submitted && !password && (
                                    <div className='help-block'>
                                        Password is required
                                    </div>
                                )}
                            </FormGroup>
                            <FormGroup>
                                {isLoading ? (
                                    <i className='fa fa-spinner fa-spinner fa-spin' />
                                ) : (
                                    <Button
                                        color='primary'
                                        onClick={() =>
                                            this.props.login(
                                                this.state.email,
                                                this.state.password,
                                            )
                                        }>
                                        Login
                                    </Button>
                                )}
                            </FormGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading, user } = state.authentication;
    return {
        isLoading,
        user,
    };
}

const mapDispatchToProps = dispatch => {
    return {
        login: (email, password) =>
            dispatch(AuthActions.loginAction(email, password)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
