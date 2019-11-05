import React, { Component } from 'react';

import Aux from "../../../../../hoc/_Aux";
import { Redirect } from 'react-router-dom'
import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';
import DEMO from '../../../../../constants/constant';


class NavRight extends Component {

    render() {
        if (this.props.isAuthenticated === undefined)
            return "Chargement...."
        else if (!this.props.isAuthenticated)
            return <Redirect to="/auth/signin" />
        else return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li className={this.props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                        <img src={Avatar2} className="img-radius img-fluid mt-2 pr-2" width="70px" alt="User Profile" />
                        <span>{this.props.user.name}</span>
                    </li>
                    <li>
                        <a href={DEMO.LOGIN} onClick={this.props.logout} className="dud-logout feather-16" title="Logout">
                            <i className="feather icon-power text-warning  " />
                        </a>
                    </li>
                </ul>

            </Aux>
        );
    }
}

export default NavRight;
