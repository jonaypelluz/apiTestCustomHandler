import { Component } from "react";
import { connect } from "react-redux";
import { AuthActions } from "../../Actions";
import { history } from "../../Helpers";

class Logout extends Component {

    componentDidMount() {
        this.props.dispatch(AuthActions.logoutAction());
        history.push("/");
    }

    render() {
        return null;
    }
    
}

export default connect()(Logout);
