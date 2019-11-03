import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import MainCard from '../../App/components/MainCard';
import Axios from 'axios';
import config from '../../constants/config';
import { tokenConfig } from '../../App/utilitity';
import Board from '../../App/components/Board';
import { Pagination } from 'antd';

class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // projects: undefined,
            pagination: {
                defaultPageSize: 5,
                pageSizeOptions: ['5', '10', '15'],
                showSizeChanger: true,
            },
        }
    }

    fetchProjects = (params = undefined) => {
        let query = ''
        if (params)
            query += `?page=${params.page}&size=${params.pageSize}`


        if (this.props.match.params.id)
            Axios
                .get(config.apiBaseUrl + "/project/category/" + this.props.match.params.id + query, tokenConfig())
                .then(res => this.setState({
                    projects: res.data.content,
                    pagination: {
                        ...this.state.pagination,
                        // Read total count from server
                        total: res.data.totalElements
                    }
                }))
                .catch(err => {
                    console.error('err', err)
                });
        else
            Axios
                .get(config.apiBaseUrl + "/project/category/autres" + query, tokenConfig())
                .then(res => this.setState({
                    projects: res.data.content,
                    pagination: {
                        ...this.state.pagination,
                        total: res.data.totalElements
                    }
                })
                )
                .catch(err => {
                    console.error('err', err)
                });
    }
    onPaginationChange = (page, pageSize) => {
        // console.log('page,pageSize', page, pageSize)
        this.fetchProjects({
            ...this.state.pagination,
            page,
            pageSize
        })
    }

    componentDidMount() {
        this.fetchProjects()
        //console.log('this.state.projects', this.state.projects)
    }
    componentDidUpdate(prevProps) {
        if (this.props.match.params.id !== prevProps.match.params.id) {
            this.fetchProjects();
        }
    }

    render() {
        const projects = this.state.projects
        if (projects && projects.length === 0)
            return (
                <>
                    <div className="container">
                        <h3 className="text-center  "> Pas de projet de cette catégorie  </h3>
                    </div>

                </>
            )

        else if (projects)
            return (
                <Aux>
                    <Pagination size="small" className=" bg-light border py-1 text-center mb-2" onChange={this.onPaginationChange} onShowSizeChange={this.onPaginationChange} {...this.state.pagination} />
                    {showProjects(projects)}
                </Aux>
            );
        else
            return (
                <div className="text-center">Chargement... </div>
            )
    }
}

const showProjects = (projects) => projects.map(project =>
    <Row key={project.id}>
        <Col>
            <MainCard title={project.name} isOption>
                <Board projectId={project.id} projectName={project.name} />
            </MainCard>
        </Col>
    </Row>)
export default Projects;

