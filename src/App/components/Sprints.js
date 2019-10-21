import { Table } from 'antd';
import React, { Component } from 'react'
import Axios from 'axios';
import { tokenConfig } from '../utilitity';
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
        let query = ''
        if (params) {
            query += `?page=${params.page}&size=${params.pageSize}`
            if (params.sortField)
                query += `&sort=${params.sortField},${params.sortOrder === 'descend' ? 'desc' : 'asc'}`
            if (params.state && params.state.length !== 0)
                query += `&state=${params.state[0]}`
        }
        Axios
            .get(`${config.baseUrl}/sprint/board/${this.props.boardId}/${query}`, tokenConfig())
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
            <PerfectScrollbar>
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
            </PerfectScrollbar>

        );
    }
}

export default Sprints;
