import React, { Component, Fragment } from "react";
import { withAlert } from "react-alert";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { transitions } from 'react-alert';

class Alerts extends Component {
    static propTypes = {
        messages: PropTypes.object.isRequired
    };

    componentDidUpdate(prevProps) {
        const alert = this.props.alert;
        const { error, message } = this.props.messages;
        const prevMess = prevProps.messages.message;
        const prevError = prevProps.messages.error;
        if (message !== prevMess) {
            alert.success(message, {
                timeout: 5000,
                // custom timeout just for this one alert
                transition: transitions.SCALE
            }
            );
        }
        if (error !== prevError) {
            //  MY ERRORS
            if (error.msg) alert.error(error.msg);
        }

    }

    render() {
        return <Fragment />;
    }
}

const mapStateToProps = state => ({
    messages: state.messages,
});

export default connect(mapStateToProps)(withAlert()(Alerts));
