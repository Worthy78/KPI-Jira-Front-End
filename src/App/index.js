import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './components/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import Alerts from './components/Alerts/Alerts';
import { loadUser } from '../store/actions/authentication';
import Loading from './components/Loader/Loading';

//CSS OF THE ENTIRE APP
import './layout/AdminLayout/app.scss';
import './layout/AdminLayout/myApp.css';

const Signin = React.lazy(() => import('../ComponentLib/Authentication/SignIn/SignIn'));

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {
    componentDidMount() {
        this.props.loadUser()
    }
    render() {
        if (this.props.auth.isLoadingUser)
            return (
                <Loading fontSize={100} color="orange" className="middle-page"> <h3> Chargement... </h3> </Loading>
            )
        else
            return (
                <Aux>
                    <ScrollToTop>
                        <Suspense fallback={<Loader />}>
                            <Alerts />
                            <Switch>
                                {/* //auth/signin-1 */}
                                <Route path="/auth/signin" exact={true} name='connexion' component={Signin} />
                                {this.props.auth.isAuthenticated ?
                                    <Route path="/" component={AdminLayout} /> : null
                                }
                                <Redirect to="/auth/signin" />
                            </Switch>
                        </Suspense>
                    </ScrollToTop>
                </Aux>
            );
    }
}

export default connect(state => ({ auth: state.auth }), { loadUser })(App);
