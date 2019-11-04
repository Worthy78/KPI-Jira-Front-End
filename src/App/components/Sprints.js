import { Table } from 'antd';
import React, { Component } from 'react'
import Axios from 'axios';
import { tokenConfig, query } from '../utilitity';
import config from '../../constants/config';
import PerfectScrollbar from 'react-perfect-scrollbar';
import columns from './SprintData';


const initPageSizeOptions = ['5', '10', '15']
class Sprints extends Component {
    state = {
        data: [],
        pagination: {
            defaultPageSize: 5,
            pageSizeOptions: [...initPageSizeOptions],
            showSizeChanger: true
        },
        loading: false,
        initialPageSizeLength: initPageSizeOptions.length
    };
    handleTableChange = (pagination, filters, sorter) => {
        //updating pagination informations
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        this.setState({
            pagination: pager,
        });

        this.fetch({
            pageSize: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            ...filters,
        });
    }
    fetch = (params = undefined) => {
        // console.log('params:', params);
        this.setState({ loading: true });
        let theQuery = ''
        if (params) {
            theQuery = query(params)
        }
        Axios
            .get(`${config.apiBaseUrl}/sprint/board/${this.props.boardId}/${theQuery}`, tokenConfig())
            .then(res => {
                const payload = res.data;
                const pagination = { ...this.state.pagination };
                // Read total count from server
                pagination.total = payload.totalElements;
                // add the total page number to pageSize options
                if (pagination.pageSizeOptions.length === this.state.initialPageSizeLength) {
                    pagination.pageSizeOptions.push(pagination.total.toString())
                    // REORDER the numbers
                    pagination.pageSizeOptions.sort((a, b) => a - b);
                }
                // Formating the data to be display
                const sprintsData = payload.content.map(sprint => {
                    const { name, startDate, endDate, state, nbIssues, bugs, usEngage, usRealise, stpEngage, stpRealise, completude, acceptanceUs, acceleration, projectName } = sprint;
                    return {
                        "key": sprint.id,
                        name, startDate, endDate, state, nbIssues, bugs, usEngage, usRealise, stpEngage, stpRealise, completude, acceptanceUs, acceleration, projectName
                    };
                })
                this.setState({
                    loading: false,
                    data: sprintsData,
                    pagination,
                });
                // SEND DATA TO THE PARENT ELEMENT IN OREDER TO RENDER EXPORT TABLE TO EXCEL FUNCTIONALITY
                this.props.dataSourceExport(sprintsData);
                //console.log('res', res)
            })
            .catch(err => {
                console.log('err', err)
            });

    }
    componentDidMount() {
        this.fetch();
    }

    componentDidUpdate(prevProps) {
        if (this.props.boardId !== prevProps.boardId) {
            this.fetch()
        }
    }
    render() {
        return (
            < PerfectScrollbar className="shadow-1 rounded" >
                <Table columns={columns}
                    //rowKey={record => record.registered}
                    dataSource={this.state.data}
                    pagination={this.state.pagination}
                    loading={this.state.loading}
                    onChange={this.handleTableChange}
                // locale={
                //     {
                //         emptyText: 'Vide'
                //     }
                // }
                // scroll={{ y: 240 }}
                />
            </PerfectScrollbar >

        );
    }
}

export default Sprints;
