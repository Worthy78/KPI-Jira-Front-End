import React from 'react';
import { Redirect } from 'react-router-dom';

import './../../../assets/scss/style.scss';
import Aux from "../../../hoc/_Aux";
//import Breadcrumb from "../../../App/layout/AdminLayout/Breadcrumb";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login } from '../../../store/actions/authentication';
import config from '../../../constants/config';
import Loading from '../../../App/components/Loader/Loading';


class Login extends React.Component {
    state = {
        username: "",
        password: "",
        stayConnected: false
    };

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.login(this.state.username, this.state.password, this.state.stayConnected);
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onStayConnected = e => this.setState({ [e.target.name]: !this.state.stayConnected });

    render() {

        if (this.props.isAuthenticated) {
            return <Redirect to="/dashboard" />;
        } else {
            const { username, password, stayConnected } = this.state;
            return (
                <Aux>
                    {/* <Breadcrumb/> */}
                    <div className="auth-wrapper">
                        <div className="auth-content">
                            <div className="auth-bg">
                                <span className="r" />
                                <span className="r s" />
                                <span className="r s" />
                                <span className="r" />
                            </div>
                            <div className="card">
                                <div className="card-body text-center">
                                    <div className="mb-4">
                                        <i className="feather icon-unlock auth-icon" />
                                    </div>
                                    <h3 className="mb-4">Connexion</h3>
                                    {(this.props.isLoading === true) ?
                                        <Loading fontSize={45} color="orange" />
                                        :
                                        (<form onSubmit={this.onSubmit}>
                                            <div className="input-group mb-3">
                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder="Nom d'utilisateur"
                                                    name="username"
                                                    onChange={this.onChange}
                                                    value={username}
                                                    required={true}
                                                />
                                            </div>
                                            <div className="input-group mb-4">
                                                <input
                                                    type="password"
                                                    className="form-control"
                                                    placeholder="Mot de passe"
                                                    name="password"
                                                    onChange={this.onChange}
                                                    value={password}
                                                    required={true}
                                                />
                                            </div>
                                            <div className="form-group text-left">
                                                <div className="checkbox checkbox-fill d-inline">
                                                    <input
                                                        type="checkbox"
                                                        name="stayConnected"
                                                        id="checkbox-fill-a1"
                                                        onChange={this.onStayConnected}
                                                        value={stayConnected}
                                                    />
                                                    <label htmlFor="checkbox-fill-a1" className="cr"> Rester connecté</label>
                                                </div>
                                            </div>
                                            <button className="btn btn-success shadow-2 mb-4 font-weight-bold" type="submit">Se connecter</button>
                                            <p className="mb-2 text-muted"> <a href={config.apiBaseUrl + "/secure/ForgotLoginDetails.jspa"}>Impossible de se connecter?</a></p>
                                            <p className="mb-0 text-muted">Pas encore membre? Contacter <a href={config.apiBaseUrl + "/secure/ContactAdministrators!default.jspa"}>L'administrateur</a></p>
                                        </form>
                                        )}
                                </div>
                            </div>
                        </div>
                    </div>
                </Aux>
            );
        }
    }
}


const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    isLoading: state.auth.isLoading
});

const mapDispatchToProps = {
    login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
