import React, { Component } from 'react'
import { Row, DropdownButton, Button, Col } from 'react-bootstrap';
import Axios from 'axios';
import config from '../../config';
import { tokenConfig } from '../utilitity';
import Sprints from './Sprints';
import { Select } from 'antd';
import { ExportExcel } from './ExportExcel';


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

    onChooseBoard = (key) => {
        this.setState({ selectedBoard: key })
        //console.log('key', key)
    }

    dataSourceFromSprintsTable = (dataSource) => {
        this.setState({ dataSource })
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
                                    <Col>        <ShowDropDown boards={boards} chooseBoard={this.onChooseBoard} /> </Col>
                                    {this.state.dataSource ?
                                        <Col className="text-right mr-2">
                                            <ExportExcel csvData={this.state.dataSource} fileName={this.props.projectName} />
                                        </Col> : null
                                    }
                                </Row>
                                <Row>
                                    {
                                        boards.length !== 0 ?
                                            <Sprints boardId={this.state.selectedBoard ? this.state.selectedBoard : boards[0].id} dataSourceExport={this.dataSourceFromSprintsTable} />
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
            // <DropdownButton
            //     title={"Selectionner un Tableau"}
            //     variant={"dark"}
            //     className="ml-2"
            // >
            <Select style={{ width: 300 }} defaultValue={boards[0].id} onChange={chooseBoard}>
                {
                    boards.map(board =>
                        // <Dropdown.Item eventKey={board.id} key={board.id} id={board.id} onClick={(e) => chooseBoard(e)}>
                        //     {board.name} scrum
                        // </Dropdown.Item>
                        <Select.Option key={board.id} value={board.id} >{board.name} scrum</Select.Option>
                    )
                }
            </Select>
            //</DropdownButton>
        )
}
export default Board
