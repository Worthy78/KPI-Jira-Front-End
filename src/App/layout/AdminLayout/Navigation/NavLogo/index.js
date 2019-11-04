import React from 'react';
import DEMO from '../../../../../constants/constant';
import Aux from "../../../../../hoc/_Aux";
import Logo from '../../../../components/Loader/Logo';

const navLogo = (props) => {
    let toggleClass = ['mobile-menu'];
    if (props.collapseMenu) {
        toggleClass = [...toggleClass, 'on'];
    }

    return (
        <Aux>
            <div className="navbar-brand header-logo">
                <a href={DEMO.DASHBORD} className="b-brand">
                    <div>
                        <Logo fontWeight={600} className="f-30 px-1 rounded " />
                    </div>
                    <span className="b-title font-weight-bold pl-1">JIRA KPI
                            <i className="fa fa-tachometer text-white fa-lg pl-2" />
                    </span>
                </a>

                <a href={DEMO.BLANK_LINK} className={toggleClass.join(' ')} id="mobile-collapse" onClick={props.onToggleNavigation}><span /></a>
            </div>
        </Aux>
    );
};

export default navLogo;
