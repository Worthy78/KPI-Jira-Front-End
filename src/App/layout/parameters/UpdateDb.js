import React from 'react'
import { withRouter } from 'react-router-dom'
import { Modal } from 'antd';
import { Button } from 'react-bootstrap';
import Loading from '../Loader/Loading';
import UcFirst from '../../components/UcFirst';
import Axios from 'axios';
import config from '../../../config';
import { tokenConfig } from '../../utilitity';

class UpdateDb extends React.Component {
    state = {
        ModalText: 'Content of the modal',
        visible: true,
        confirmLoading: false,
    }

    handleOk = () => {
        console.log('ok')
        this.props.history.goBack()

    }

    componentDidMount() {
        this.setState({
            confirmLoading: true,
        });
        setTimeout(() => {
            this.setState({
                confirmLoading: false,
            });
        }, 2000);

        // Axios
        //     .get(`${config.baseUrl}/sprint/board`, tokenConfig())
        //     .then(res => {
        //         this.setState({
        //             confirmLoading: true,
        //         });
        //     })
        //     .catch(err => {
        //         console.log('err', err)
        //         this.setState({
        //             confirmLoading: true,
        //         });
        //     });

    }
    //   handleCancel = () => {
    //     console.log('Clicked cancel button');
    //     this.setState({
    //       visible: false,
    //     });
    //   }
    render() {
        const { visible, confirmLoading } = this.state;

        return (
            <div>

                <Modal title={<div><i className="feather icon-refresh-cw pr-2" style={{ fontSize: "21px" }}></i>Mise à Jour la base de donnée</div>}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    closable={false}
                    footer={null}
                //onCancel={this.handleCancel}
                >
                    {confirmLoading ?
                        <Loading className="my-2" fontSize={65} color="orange" />
                        : <div className='container text-center ' style={{ fontSize: "25px " }}>
                            Mise à jour avec succès <br />
                            <i class="fa fa-check-circle fa-2x text-success mt-1" aria-hidden="true"></i>
                        </div>
                    }
                    <div className="text-right">
                        <Button onClick={this.handleOk} className="py-1" style={{ background: "#F16E00", borderColor: "rgba(241, 110, 0, 0.78)" }}>
                            {confirmLoading ?
                                "En cours..." :
                                <UcFirst text={"Ok"} />
                            }
                        </Button>
                    </div>
                </Modal>
                {/* {visible ? info(confirmLoading, this.onOk) : null} */}
            </div>
        );
    }
}

export default withRouter(UpdateDb);
