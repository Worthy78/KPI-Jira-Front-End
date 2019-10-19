import React from 'react';
import { Row, Col } from 'react-bootstrap';

import Aux from "../../hoc/_Aux";
import MainCard from '../../App/components/MainCard';
import Axios from 'axios';
import config from '../../config';
import { tokenConfig } from '../../App/utilitity';
import Board from '../../App/components/Board';


class Projects extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            // projects: undefined,
        }
    }

    fetchProjects = () => {
        if (this.props.match.params.id)
            Axios
                .get(config.baseUrl + "/project/category/" + this.props.match.params.id, tokenConfig)
                .then(res => this.setState({ projects: res.data }))
                .catch(err => {
                    console.error('err', err)
                });
        else
            Axios
                .get(config.baseUrl + "/project/category/autres", tokenConfig)
                .then(res => this.setState({ projects: res.data }))
                .catch(err => {
                    console.error('err', err)
                });
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
                <Board projectId={project.id} />
            </MainCard>
        </Col>

    </Row>)
export default Projects;

