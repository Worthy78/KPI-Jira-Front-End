import React, { Component } from 'react'
import { Row, DropdownButton, Button, Col, ButtonGroup } from 'react-bootstrap';
import Axios from 'axios';
import config from '../../constants/config';
import { tokenConfig } from '../utilitity';
import Sprints from './Sprints';
import { Select } from 'antd';
import { ExportExcel } from './ExportExcel';
import ReactToPrint from "react-to-print";

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
            .get(config.apiBaseUrl + "/boards/project/" + this.props.projectId, tokenConfig())
            .then(res => {
                this.setState({ boards: res.data })
            })
            .catch(err => {
                console.error('err', err)
            });
    }
    componentDidMount() {
        this.fetchBoards()
    }

    onChooseBoard = (key) => {
        this.setState({ selectedBoard: key })
    }

    dataSourceFromSprintsTable = (dataSource) => {
        this.setState({ dataSource })
    }
    render() {
        const boards = this.state.boards

        if (boards) {
            const MOST_RECENT_BOARD = boards.length - 1
            return (
                <>
                    <Row className="mb-2">
                        <Col>
                            <ShowDropDown boards={boards} mostRecentBoard={MOST_RECENT_BOARD} chooseBoard={this.onChooseBoard} />
                        </Col>
                        {this.state.dataSource ?
                            <>
                                <Col className="text-right mr-2">
                                    <ButtonGroup >
                                        <ExportExcel csvData={this.state.dataSource} fileName={this.props.projectName} />
                                        <ReactToPrint
                                            trigger={() => <Button variant="danger">  <i className="feather icon-file-text  mx-0 " style={{ fontSize: "25px " }}></i> <span className="font-weight-bold">Pdf</span></Button>}
                                            content={() => this.componentRef}
                                        />
                                    </ButtonGroup>
                                </Col>

                            </>
                            : null
                        }
                    </Row>
                    <Row className="justify-content-center">
                        {
                            boards.length !== 0 ?
                                <Sprints ref={el => (this.componentRef = el)} boardId={this.state.selectedBoard ? this.state.selectedBoard : boards[MOST_RECENT_BOARD].id} dataSourceExport={this.dataSourceFromSprintsTable} />
                                : null
                        }
                    </Row>
                </>

            )
        }
        else
            return <DropdownButton
                title={"Chargement..."}
                variant={"dark"}
                className="ml-2"
            />


    }
}

const ShowDropDown = ({ boards, chooseBoard, mostRecentBoard }) => {
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
            <Select size={"large"} style={{ width: 300 }} defaultValue={boards[mostRecentBoard].id} onChange={chooseBoard}>
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
