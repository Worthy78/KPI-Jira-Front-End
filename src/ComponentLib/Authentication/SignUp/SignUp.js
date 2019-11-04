import React from 'react';
import './../../../assets/scss/style.scss';
import Loading from '../../../App/components/Loader/Loading';
import PropTypes from "prop-types";
import { connect } from 'react-redux';
import { register } from '../../../store/actions/authentication';
class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        email: ""
    };

    static propTypes = {
        register: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired
    };

    onSubmit = e => {
        e.preventDefault();
        this.props.register(this.state);
    };

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    render() {
        const { username, password, email } = this.state;
        return (
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
                                <i className="feather icon-user-plus auth-icon f-30" />
                                Ajout utilisateur
                            </div>
                            {(this.props.isLoading) ?
                                <Loading fontSize={45} color="orange" />
                                :
                                (<form onSubmit={this.onSubmit}>
                                    <div className="input-group mb-3">
                                        <input
                                            // type="email"
                                            className="form-control"
                                            placeholder="Nom"
                                            name="email"
                                            onChange={this.onChange}
                                            value={email}
                                        />
                                    </div>

                                    <div className="input-group mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="Nom d'utilisateur"
                                            name="username"
                                            onChange={this.onChange}
                                            value={username}
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
                                        />
                                    </div>
                                    <button className="btn btn-success shadow-2 mb-4 font-weight-bold" type="submit">Ajouter</button>
                                </form>
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isLoading: state.auth.isLoading
});

const mapDispatchToProps = {
    register
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
