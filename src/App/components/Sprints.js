import { Table } from 'antd';
import React, { Component } from 'react'
import Axios from 'axios';
import { tokenConfig, query } from '../utilitity';
import config from '../../config';
import PerfectScrollbar from 'react-perfect-scrollbar';
import columns from './SprintData';



class Sprints extends Component {
    state = {
        data: [],
        pagination: {
            defaultPageSize: 5,
            pageSizeOptions: ['5', '10', '15'],
            showSizeChanger: true
        },
        loading: false,
    };
    handleTableChange = (pagination, filters, sorter) => {
        //console.log('pagination', pagination)
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
            .get(`${config.baseUrl}/sprint/board/${this.props.boardId}/${theQuery}`, tokenConfig())
            .then(res => {
                const payload = res.data;
                const pagination = { ...this.state.pagination };
                // Read total count from server
                pagination.total = payload.totalElements;
                // Formating the data to be display
                const sprintsData = payload.content.map(sprint => {
                    const { name, startDate, endDate, state, nbIssues, bugs, usEngage, usRealise, stpEngage, stpRealise, completude, acceptanceUs, acceleration } = sprint;
                    return {
                        "key": sprint.id,
                        name, startDate, endDate, state, nbIssues, bugs, usEngage, usRealise, stpEngage, stpRealise, completude, acceptanceUs, acceleration
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
            < PerfectScrollbar className="shadow-1 " >
                <Table columns={columns} className='shadow-3'
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
