import React, { Component } from 'react';
import { connect } from 'react-redux';
import windowSize from 'react-window-size';

// import NavSearch from './NavSearch';
import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../constants/constant";
import * as actionTypes from "../../../../../store/actions";
import ProjectSearch from './NavSearch/ProjectSearch';

class NavLeft extends Component {

    render() {
        let iconFullScreen = ['feather'];
        iconFullScreen = (this.props.isFullScreen) ? [...iconFullScreen, 'icon-minimize'] : [...iconFullScreen, 'icon-maximize'];

        return (
            <Aux>
                <ul className="navbar-nav mr-auto">
                    <li><a href={DEMO.BLANK_LINK} className="full-screen" onClick={this.props.onFullScreen}><i className={iconFullScreen.join(' ')} /></a></li>
                    {/* <li className="nav-item"><NavSearch /></li> */}
                    <li className="nav-item"><ProjectSearch collapseMenu={this.props.collapseMenu} /></li>
                </ul>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isFullScreen: state.ui.isFullScreen,
        rtlLayout: state.ui.rtlLayout
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onFullScreen: () => dispatch({ type: actionTypes.FULL_SCREEN }),
        collapseMenu: () => dispatch({ type: actionTypes.COLLAPSE_MENU }),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(windowSize(NavLeft));
