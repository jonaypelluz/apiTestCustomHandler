import { Dialog } from "@reach/dialog";
import "@reach/dialog/styles.css";
import React, { Component } from "react";
import { Button } from "reactstrap";

class Confirm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            callback: null,
        };
    }

    show = callback => event => {
        console.log(event);
        event.preventDefault();

        event = {
            ...event,
            target: { ...event.target, value: event.target.value },
        };

        this.setState({
            open: true,
            callback: () => callback(event),
        });
    };

    hide = () => this.setState({ open: false, callback: null });

    confirm = () => {
        this.state.callback();
        this.hide();
    };

    render() {
        return (
            <>
                {this.props.children(this.show)}

                {this.state.open && (
                    <Dialog>
                        <h1>{this.props.title}</h1>
                        <p>{this.props.description}</p>

                        <Button
                            color='danger'
                            className='mr-3'
                            onClick={this.hide}>
                            Cancel
                        </Button>
                        <Button color='primary' onClick={this.confirm}>
                            OK
                        </Button>
                    </Dialog>
                )}
            </>
        );
    }
}

export default Confirm;
