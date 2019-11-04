import React, { Component } from 'react';
import { connect } from 'react-redux';

import NavLeft from "./NavLeft";
import NavRight from "./NavRight";
import Aux from "../../../../hoc/_Aux";
import DEMO from "../../../../constants/constant";
import * as actionTypes from "../../../../store/actions";
import { logout } from '../../../../store/actions/authentication';
import Logo from '../../../components/Loader/Logo';

class NavBar extends Component {
    render() {
        let headerClass = ['navbar', 'pcoded-header', 'navbar-expand-lg', this.props.headerBackColor];
        if (this.props.headerFixedLayout) {
            headerClass = [...headerClass, 'headerpos-fixed'];
        }

        let toggleClass = ['mobile-menu'];
        if (this.props.collapseMenu) {
            toggleClass = [...toggleClass, 'on'];
        }
        return (
            <Aux>
                <header className={headerClass.join(' ')}>
                    <div className="m-header">
                        <a className={toggleClass.join(' ')} id="mobile-collapse1" href={DEMO.BLANK_LINK} onClick={this.props.onToggleNavigation}><span /></a>
                        <a href={DEMO.DASHBORD} className="b-brand">
                            <div>
                                <Logo fontWeight={600} className="f-30 px-1 rounded " />
                            </div>
                            <span className="b-title font-weight-bold pl-1">JIRA KPI
                            <i className="fa fa-tachometer text-white fa-1-5x pl-2" />
                            </span>
                        </a>
                    </div>
                    <a className="mobile-menu" id="mobile-header" href={DEMO.BLANK_LINK}><i className="feather icon-more-horizontal" /></a>
                    <div className="collapse navbar-collapse">
                        <NavLeft />
                        <NavRight user={this.props.user} isAuthenticated={this.props.isAuthenticated} logout={this.props.logout} rtlLayout={this.props.rtlLayout} />
                    </div>
                </header>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        rtlLayout: state.ui.rtlLayout,
        headerBackColor: state.ui.headerBackColor,
        headerFixedLayout: state.ui.headerFixedLayout,
        collapseMenu: state.ui.collapseMenu,
        isAuthenticated: state.auth.isAuthenticated,
        user: state.auth.user,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onToggleNavigation: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
        logout: () => dispatch(logout())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
