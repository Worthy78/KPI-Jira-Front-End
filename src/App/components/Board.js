import React, { Component } from 'react'
import { Row, Table, Dropdown, DropdownButton } from 'react-bootstrap';


export class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <Row className="mb-2">
                    <DropdownButton
                        title={"Selectionner un Tableau"}
                        variant={"dark"}
                        className="ml-2"
                    >
                        <Dropdown.Item eventKey="1">Action</Dropdown.Item>
                        <Dropdown.Item eventKey="2">Another action</Dropdown.Item>
                        <Dropdown.Item eventKey="3">Something else hear</Dropdown.Item>
                    </DropdownButton>
                </Row>
                <Row>
                    <Table responsive hover>
                        <thead>
                            <tr>
                                <th>Sprint</th>
                                <th>début</th>
                                <th>Fin</th>
                                <th>Statut</th>
                                <th>Nombre de Issues</th>
                                <th>BUG</th>
                                <th>US Engagé</th>
                                <th>US Réalisé</th>
                                <th>STP Engagé</th>
                                <th>STP Réalisé</th>
                                <th>Complétude du sprint</th>
                                <th>Acceptance des US</th>
                                <th>Accélération</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th scope="row">1</th>
                                <td>04/12/2018</td>
                                <td>04/12/2018</td>
                                <td>Clôturé</td>
                                <td>7</td>
                                <td>0</td>
                                <td>18</td>
                                <td>15</td>
                                <td>59</td>
                                <td>46</td>
                                <td>78%</td>
                                <td>83%</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">2</th>
                                <td>04/12/2018</td>
                                <td>04/12/2019</td>
                                <td>en Cours</td>
                                <td>7</td>
                                <td>0</td>
                                <td>18</td>
                                <td>15</td>
                                <td>59</td>
                                <td>46</td>
                                <td>78%</td>
                                <td>83%</td>
                                <td></td>
                            </tr>
                            <tr>
                                <th scope="row">3</th>
                                <td>04/12/2018</td>
                                <td>04/12/2020</td>
                                <td>Futur</td>
                                <td>7</td>
                                <td>0</td>
                                <td>18</td>
                                <td>15</td>
                                <td>59</td>
                                <td>46</td>
                                <td>78%</td>
                                <td>83%</td>
                                <td></td>
                            </tr>
                        </tbody>
                    </Table>
                </Row>
            </div>
        )
    }
}

export default Board
