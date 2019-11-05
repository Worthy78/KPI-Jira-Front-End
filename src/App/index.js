import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './components/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import Alerts from './components/Alerts/Alerts';
import { authCheckState } from '../store/actions/authentication';
import Fade from 'react-reveal';
import Wobble from 'react-reveal/Wobble';

//CSS OF THE ENTIRE APP
import './layout/AdminLayout/app.scss';
import './layout/AdminLayout/myApp.css';
import Logo from './components/Loader/Logo';

const Signin = React.lazy(() => import('../ComponentLib/Authentication/SignIn/SignIn'));

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {

    constructor(props) {
        super(props)
        this.props.onTryAutoSignup();
    }

    render() {
        if (this.props.auth.isLoadingUser)
            //if (true)
            return (
                //<Loading fontSize={100} color="orange" className="middle-page"> <h3> Chargement... </h3> </Loading>
                <div className="middle-page">
                    <Wobble forever={true} duration={1500} >
                        <Logo fontWeight={600} className="f-60 px-1" />
                    </Wobble>
                    <h3> Chargement... </h3>
                </div>
            )
        else
            return (
                <Aux>
                    <Fade big>
                        <ScrollToTop>
                            <Suspense fallback={<Loader />}>
                                <Alerts />
                                <Switch>
                                    {/* //auth/signin-1 */}
                                    <Route path="/auth/signin" exact={true} name='connexion' render={() => <Fade ><Signin /></Fade>} />
                                    {this.props.auth.isAuthenticated ?
                                        <Route path="/" component={AdminLayout} /> : <Redirect to='/auth/signin' />
                                    }
                                </Switch>
                            </Suspense>
                        </ScrollToTop>
                    </Fade>
                </Aux>
            );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onTryAutoSignup: () => dispatch(authCheckState()),
    }
}
export default connect(state => ({ auth: state.auth }), mapDispatchToProps)(App);
