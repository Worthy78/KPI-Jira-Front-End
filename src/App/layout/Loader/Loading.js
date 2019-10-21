import React from 'react'
import { Spin, Icon } from 'antd';
import { Container, Row } from 'react-bootstrap';

const antIcon = (fontSize, color) => (<Icon type="loading" style={{ fontSize, color }} spin />);

function Loading(props) {
    return (
        <>
            <Container fluid className={props.className}>
                <Row className="justify-content-center">
                    <Spin indicator={antIcon(props.fontSize, props.color)} />
                </Row>
                <Row className="justify-content-center">
                    {props.children}
                </Row>
            </Container>
        </>
    )
}

export default Loading
