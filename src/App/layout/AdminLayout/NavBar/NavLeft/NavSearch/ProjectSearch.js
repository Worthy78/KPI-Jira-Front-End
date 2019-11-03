import React, { Component } from 'react';
import Aux from "../../../../../../hoc/_Aux";
import { Modal } from 'antd';
import { Input, AutoComplete } from 'antd';
import {
    InputGroup
} from "react-bootstrap";
import Axios from 'axios';
import { tokenConfig } from '../../../../../utilitity';
import Board from '../../../../../components/Board';
import config from '../../../../../../constants/config';

const { Option } = AutoComplete;
class ProjectSearch extends Component {
    state = {
        searchResults: [],
        selectedProject: null,
        visible: false
    };

    handleOk = e => {
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };

    renderOption = (project, key) => {
        return (
            <Option key={project.id} label={project.name} project={project} >
                <div className="text-left a-style">
                    <span className="text-uppercase">{project.name}</span>
                </div>
            </Option>
        );
    }

    onSelect = (value, option) => {
        this.setState({
            selectedProject: option.props.project,
            visible: true
        })
        this.props.collapseMenu()
    }

    handleSearch = (value) => {
        if (value !== "")
            Axios
                .get(`${config.apiBaseUrl}/project/search/${value}`, tokenConfig())
                .then(res => {
                    const results = res.data;
                    this.setState({
                        searchResults: results,
                    });
                })
                .catch(err => {
                    console.error(err);
                })
    }

    render() {
        const { selectedProject, searchResults, visible } = this.state;
        return (
            <Aux>
                <InputGroup className="input-group-alternative">
                    <InputGroup.Prepend className="search-btn btn btn-light">

                        <i className="feather icon-search input-group-text" />

                        <div className="my-1 mx-1">
                            <AutoComplete
                                className="global-search"
                                size="large"
                                dataSource={searchResults.map(this.renderOption)}
                                onSelect={this.onSelect}
                                onSearch={this.handleSearch}
                                allowClear
                                optionLabelProp="label"
                            >
                                <Input className="" placeholder="Rechercher un project ..." />
                            </AutoComplete>
                        </div>
                    </InputGroup.Prepend>
                </InputGroup>
                {visible ?
                    modal(selectedProject, this.handleOk, this.handleCancel) :
                    null
                }
            </Aux>
        );
    }
}

const modal = (project, handleOk, handleCancel) => (
    <Modal
        title={project.name}
        visible={true}
        onOk={handleOk}
        onCancel={handleCancel}
        width={950}
        destroyOnClose={true}
    >
        <Board projectId={project.id} projectName={project.name} />
    </Modal>)


export default ProjectSearch;