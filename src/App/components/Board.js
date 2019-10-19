import React, { Component } from 'react'
import { Row, Dropdown, DropdownButton, Button } from 'react-bootstrap';
import Axios from 'axios';
import config from '../../config';
import { tokenConfig } from '../utilitity';
import Sprints from './Sprints';


export class Board extends Component {
    constructor(props) {
        super(props)
        this.state = {
            //boards : undefined,
            //sprints : undefined,
            // selectedBoard
        }
    }


    fetchBoards = () => {
        Axios
            .get(config.baseUrl + "/boards/project/" + this.props.projectId, tokenConfig())
            .then(res => this.setState({ boards: res.data }))
            .catch(err => {
                console.error('err', err)
            });
    }
    componentDidMount() {
        this.fetchBoards()
        //console.log('this.state.Boards', this.state.Boards)
    }

    onChooseBoard = (e) => {

        console.log(e.currentTarget.textContent)
        console.log(e.altKey)
        console.log(e.metaKey)
    }

    render() {
        const boards = this.state.boards

        return (
            <div>

                {
                    boards ?
                        (
                            <>
                                <Row className="mb-2">
                                    <ShowDropDown boards={boards} chooseBoard={this.onChooseBoard} />
                                </Row>
                                <Row>
                                    {
                                        boards.length !== 0 ?
                                            <Sprints boardId={boards[0].id} />
                                            : null
                                    }
                                </Row>
                            </>

                        )
                        : <DropdownButton
                            title={"Chargement..."}
                            variant={"dark"}
                            className="ml-2"
                        />
                }


            </div>
        )
    }
}

const ShowDropDown = ({ boards, chooseBoard }) => {

    if (boards.length === 1)
        return <Button variant={"outline-dark"} className="ml-2">  {boards[0].name} scrum</Button>
    else if (boards.length === 0)
        return <Button variant={"outline-danger"} className="ml-2">  Tableaux Introuvable ou Inexistants</Button>
    else
        return (
            <DropdownButton
                title={"Selectionner un Tableau"}
                variant={"dark"}
                className="ml-2"
            >
                {
                    boards.map(board =>
                        <Dropdown.Item eventKey={board.id} key={board.id} onClick={(e) => chooseBoard(e)}>
                            <input type="hidden" id={board.id} value={board.id} ></input>
                            {board.name} scrum
                        </Dropdown.Item>)
                }
            </DropdownButton>
        )
}
export default Board

/* <Row>
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
            */