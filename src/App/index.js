import React, { Component, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Loadable from 'react-loadable';
import { connect } from 'react-redux';
import '../../node_modules/font-awesome/scss/font-awesome.scss';

import Loader from './components/Loader'
import Aux from "../hoc/_Aux";
import ScrollToTop from './layout/ScrollToTop';
import Alerts from './components/Alerts/Alerts';

const Signin = React.lazy(() => import('../ComponentLib/Authentication/SignIn/SignIn'));

const AdminLayout = Loadable({
    loader: () => import('./layout/AdminLayout'),
    loading: Loader
});

class App extends Component {
    render() {
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

export default connect(state => ({ auth: state.auth }))(App);
