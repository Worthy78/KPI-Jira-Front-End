import { DatePicker } from 'antd';
import React, { Component } from 'react'

export default class DateRange extends Component {
    state = {
        startDate: null,
        endDate: null,
        endOpen: false,
    };

    disabledStartDate = startDate => {
        const { endDate } = this.state;
        if (!startDate || !endDate) {
            return false;
        }
        return startDate.valueOf() > endDate.valueOf();
    };

    disabledEndDate = endDate => {
        const { startDate } = this.state;
        if (!endDate || !startDate) {
            return false;
        }
        return endDate.valueOf() <= startDate.valueOf();
    };

    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
        this.props.onPickDate({ [field]: value })
    };

    onStartChange = value => {
        this.onChange('startDate', value);
    };

    onEndChange = value => {
        this.onChange('endDate', value);
    };

    handleStartOpenChange = open => {
        if (!open) {
            this.setState({ endOpen: true });
        }
    };

    handleEndOpenChange = open => {
        this.setState({ endOpen: open });
    };

    render() {
        const { startDate, endDate, endOpen } = this.state;
        return (
            <>
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    //showTime
                    format="DD-MM-YYYY"
                    value={startDate}
                    placeholder="Début"
                    onChange={this.onStartChange}
                    onOpenChange={this.handleStartOpenChange}
                    size={"large"}
                />
                {'   '}
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    //showTime
                    format="DD-MM-YYYY"
                    value={endDate}
                    placeholder="Fin"
                    onChange={this.onEndChange}
                    open={endOpen}
                    onOpenChange={this.handleEndOpenChange}
                    size={"large"}
                />
            </>
        );
    }
}
