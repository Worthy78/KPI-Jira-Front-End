import React, { Component } from 'react';

import Aux from "../../../../../hoc/_Aux";
import DEMO from "../../../../../store/constant";

import Avatar2 from '../../../../../assets/images/user/avatar-2.jpg';


class NavRight extends Component {
    render() {

        return (
            <Aux>
                <ul className="navbar-nav ml-auto">
                    <li className={this.props.rtlLayout ? 'm-r-15' : 'm-l-15'}>
                        <img src={Avatar2} className="img-radius img-fluid mt-2 pr-2" width="70px" alt="User Profile" />

                        <span>Pape Malick</span>
                    </li>
                    <li>
                        <a href={DEMO.BLANK_LINK} className="dud-logout feather-16" title="Logout">
                            <i className="feather icon-power text-warning  " />
                        </a>
                    </li>
                </ul>

            </Aux>
        );
    }
}

export default NavRight;
