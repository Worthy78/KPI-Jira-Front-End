import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Aux from '../../../hoc/_Aux/index';
import SignUp from '../../../ComponentLib/Authentication/SignUp/SignUp';


function AddUser() {
    return (
        <Aux>
            <Row>
                <Col>
                    <SignUp />
                </Col>
            </Row>
        </Aux>
    )
}
export default AddUser;