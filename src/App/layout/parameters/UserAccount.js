import React from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import Aux from '../../../hoc/_Aux/index';
import SignUp from '../../../ComponentLib/Authentication/SignUp/SignUp';


function UserAccount() {
    return (
        <Aux>
            <Row>
                <Col>
                    <Card>
                        <Card.Header>
                            <Card.Title as="h5">  Ajouter un utilisateur</Card.Title>
                        </Card.Header>
                        < Card.Body >
                            <SignUp />
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Aux>
    )
}
export default UserAccount;