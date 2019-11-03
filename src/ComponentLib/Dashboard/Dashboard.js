import { Table } from 'antd';
import React, { Component } from 'react'
import Axios from 'axios';
import config from '../../constants/config';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Row, Button, Col, ButtonGroup } from 'react-bootstrap';
import ReactToPrint from "react-to-print";
import { ExportExcel } from '../../App/components/ExportExcel';
import columns from '../../App/components/SprintData';
import { tokenConfig, query, formatDate } from '../../App/utilitity';
import DateRange from '../../App/components/Date/DateRange';
import moment from 'moment';

const dashColumns = [...columns];
dashColumns.unshift(
    {
        title: 'Plateau',
        dataIndex: 'projectName'
    }
)
// remove KPIs  &&  only show raw data extrated from JIRA
dashColumns.splice(dashColumns.length - 4, 4);

const initPageSizeOptions = ['5', '10', '15', '20']
class Dashboard extends Component {
    state = {
        data: [],
        pagination: {
            defaultPageSize: 10,
            pageSizeOptions: [...initPageSizeOptions],
            showSizeChanger: true
        },
        loading: false,
        params: {},
        initialPageSizeLength: initPageSizeOptions.length
    };
    handleTableChange = (pagination, filters, sorter) => {
        //console.log('pagination', pagination)
        const pager = { ...this.state.pagination };
        pager.current = pagination.current;
        const nextParams = {
            pageSize: pagination.pageSize,
            page: pagination.current,
            sortField: sorter.field,
            sortOrder: sorter.order,
            startDate: this.state.startDate,
            endDate: this.state.endDate,
            ...filters,
        }
        this.setState({
            pagination: pager,
            params: nextParams
        });
        this.fetch(nextParams);
    }
    fetch = (params = undefined) => {
        // console.log('params:', params);
        this.setState({ loading: true });
        let theQuery = ''
        if (params) {
            theQuery = query(params)
        }
        Axios
            .get(`${config.apiBaseUrl}/sprint/dashboard/${theQuery}`, tokenConfig())
            .then(res => {
                const payload = res.data;
                const pagination = { ...this.state.pagination };
                // Read total count from server
                pagination.total = payload.totalElements;
                if (pagination.pageSizeOptions.length === this.state.initialPageSizeLength) {
                    pagination.pageSizeOptions.push(pagination.total.toString())
                    // REORDER the numbers
                    pagination.pageSizeOptions.sort((a, b) => a - b);
                }
                // Formating the data to be display
                const DashboardData = payload.content.map(sprint => {
                    const { name, startDate, endDate, state, nbIssues, bugs, usEngage, usRealise, stpEngage, stpRealise, completude, acceptanceUs, acceleration, projectName } = sprint;
                    return {
                        "key": sprint.id,
                        name, startDate, endDate, state, nbIssues, bugs, usEngage, usRealise, stpEngage, stpRealise, completude, acceptanceUs, acceleration, projectName
                    };
                })
                this.setState({
                    loading: false,
                    data: DashboardData,
                    pagination,
                });

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

    // HANDLING DATE CHANGES
    onPickDate = (Value) => {
        this.setState(Value)
    }
    onDatePicked = () => {
        if (this.state.startDate && this.state.endDate) {
            let params = this.state.params
            params.startDate = this.state.startDate
            params.endDate = this.state.endDate
            this.fetch(params)
        }
    }

    render() {
        return (
            <Col className='mt-1'>
                <Row  >
                    <Col sm={4} xs={12}>
                        <ButtonGroup >
                            <ExportExcel csvData={this.state.data} fileName={"Extraction - " + formatDate(moment())} columns={dashColumns} />
                            <ReactToPrint
                                trigger={() => <Button variant="danger">  <i className="feather icon-file-text  mx-0 " style={{ fontSize: "25px " }}></i> <span className="font-weight-bold">Pdf</span></Button>}
                                content={() => this.componentRef}
                            />
                        </ButtonGroup>
                    </Col >
                    <Col sm={8} xs={12} className="align-self-center text-right ">
                        <DateRange onPickDate={this.onPickDate} />
                        <Button onClick={this.onDatePicked} variant="outline-success" className="btn-icon  btn-rounded ml-2">
                            <i className="feather icon-save" aria-hidden="true"></i>
                        </Button>
                    </Col>
                </Row>

                <Row className="mt-2 justify-content-center ">
                    < PerfectScrollbar className='py-2 px-2' ref={el => (this.componentRef = el)} >
                        <Table columns={dashColumns} className='shadow-1 rounded'
                            //rowKey={record => record.registered}
                            dataSource={this.state.data}
                            pagination={this.state.pagination}
                            loading={this.state.loading}
                            onChange={this.handleTableChange}
                        />
                    </PerfectScrollbar >
                </Row>
            </Col>
        );
    }
}

export default Dashboard;
