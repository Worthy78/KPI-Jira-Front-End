import React from 'react';
import { Row, Col, Table } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import MainCard from '../../App/components/MainCard';

class Projects extends React.Component {
    render() {
        return (
            <Aux>
                <Row>
                    <Col>
                        <MainCard title="Projet :  RADAR " isOption>

                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Sprint</th>
                                        <th>début</th>
                                        <th>Fin</th>
                                        <th>Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2018</td>
                                        <td>Clôturé</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2019</td>
                                        <td>en Cours</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2020</td>
                                        <td>Futur</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </MainCard>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <MainCard title="Projet :  ESHOP " isOption>

                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Sprint</th>
                                        <th>début</th>
                                        <th>Fin</th>
                                        <th>Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2018</td>
                                        <td>Clôturé</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2019</td>
                                        <td>en Cours</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2020</td>
                                        <td>Futur</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </MainCard>
                    </Col>

                </Row>
                <Row>
                    <Col>
                        <MainCard title="Projet :  NESSICO " isOption>

                            <Table responsive hover>
                                <thead>
                                    <tr>
                                        <th>Sprint</th>
                                        <th>début</th>
                                        <th>Fin</th>
                                        <th>Statut</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2018</td>
                                        <td>Clôturé</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2019</td>
                                        <td>en Cours</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>04/12/2018</td>
                                        <td>04/12/2020</td>
                                        <td>Futur</td>
                                    </tr>
                                </tbody>
                            </Table>

                        </MainCard>
                    </Col>

                </Row>
            </Aux>
        );
    }
}

export default Projects;