import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { Container, Row, Col, Button, Form, FormGroup, Label, Input } from "reactstrap";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {
        firstName: "",
        lastName: "",
        username: "",
        password: ""
      },
      submitted: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    const { name, value } = e.target;
    const { user } = this.state;
    this.setState({
      user: {
        ...user,
        [name]: value
      }
    });
  }

  render() {
    const { isLoading } = this.props;
    const { user, submitted } = this.state;
    return (
      <Container>
        <Row>
          <Col sm={{ size: 6, offset: 3 }}>
            <h2>Register</h2>
            <Form name="form" onSubmit={this.handleSubmit}>
              <FormGroup className={submitted && !user.firstName ? " has-error" : ""}>
                <Label for="firstName">First name</Label>
                <Input
                  type="text"
                  name="firstName"
                  id="firstName"
                  maxLength={125}
                  placeholder="Your first name"
                  value={user.firstName}
                  onChange={this.handleChange}
                />
                {submitted && !user.firstName && <div className="help-block">First Name is required</div>}
              </FormGroup>
              <FormGroup className={submitted && !user.lastName ? " has-error" : ""}>
                <Label for="lastName">Last name</Label>
                <Input
                  type="text"
                  name="lastName"
                  id="lastName"
                  maxLength={125}
                  placeholder="Your last name"
                  value={user.lastName}
                  onChange={this.handleChange}
                />
                {submitted && !user.lastName && <div className="help-block">Last Name is required</div>}
              </FormGroup>
              <FormGroup className={submitted && !user.username ? " has-error" : ""}>
                <Label for="username">Username</Label>
                <Input
                  type="text"
                  name="username"
                  id="username"
                  maxLength={125}
                  placeholder="Your username"
                  value={user.username}
                  onChange={this.handleChange}
                />
                {submitted && !user.username && <div className="help-block">Username is required</div>}
              </FormGroup>
              <FormGroup className={submitted && !user.password ? " has-error" : ""}>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  maxLength={125}
                  placeholder="Your password"
                  value={user.password}
                  onChange={this.handleChange}
                />
                {submitted && !user.password && <div className="help-block">Password is required</div>}
              </FormGroup>
              <FormGroup>
                <Button color="primary">Register</Button>
                {isLoading && <i class="fa fa-spinner fa-spin" />}
                <Link to="/login" className="btn btn-link">
                  Cancel
                </Link>
              </FormGroup>
            </Form>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  const { isLoading } = state.registration;
  return {
    isLoading
  };
}

export default connect(mapStateToProps)(Register);
