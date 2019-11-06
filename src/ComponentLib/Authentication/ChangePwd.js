import React from "react";
// reactstrap components

import {
    Button,
    Alert
} from "react-bootstrap";
import { Modal } from "antd";
import { connect } from "react-redux";
import Loading from "../../App/components/Loader/Loading";
import { changePassword } from "../../store/actions/authentication";



class ChangePwd extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            data: {
                oldPassword: "",
                newPassword1: "",
                newPassword2: ""
            },
            error: "",
            visible: true,
            confirmLoading: false,
        };
    }
    handleOk = () => {
        this.props.history.goBack()
    }

    componentDidMount() {
        this.setState({
            confirmLoading: true,
        });
    }
    // componentWillReceiveProps() {

    //     if (this.props.msg.changedPassword !== undefined)
    //         this.setState({ formModal: false })
    //     // checking if the message is an empty object (if this.props.ApiErrors=msg==={})
    //     else if (!objectIsEmpty(this.props.ApiErrors)) {
    //         if (this.props.ApiErrors.newPassword2) {
    //             this.setState({ error: this.props.ApiErrors.newPassword2.join() })
    //         } else if (this.props.ApiErrors.newPassword2) {
    //             this.setState({ error: this.props.ApiErrors.newPassword1.join() })
    //         } else {
    //             this.setState({ error: this.props.ApiErrors.oldPassword.join() })
    //         }
    //     }
    // }
    onSubmit = e => {
        e.preventDefault();
        if (this.state.data.newPassword1 !== this.state.data.newPassword2) {
            this.setState({ error: "Les deux mots de passes ne correspondent pas" });

        } else {
            this.props.changePassword(this.state.data);
        }
    };

    onChange = e => this.setState({
        data: { ...this.state.data, [e.target.name]: e.target.value }
    });

    toggleModal = () => {
        this.setState({
            visible: !this.state.visible
        });
    };
    render() {
        const { oldPassword, newPassword1, newPassword2 } = this.state.data
        const { visible, confirmLoading } = this.state;
        return (
            <>

                <Modal title={
                    <div className="text-muted text-center mt-1 mb-1">
                        <i className="feather icon-lock pr-2" style={{ fontSize: "21px" }}></i>
                        Changement de  mot de passe
                    </div>}
                    visible={visible}
                    confirmLoading={confirmLoading}
                    closable={false}
                    footer={null}
                    width={400}
                    zIndex={10}
                //onCancel={this.handleCancel}
                >

                    {(this.props.isChangingPwd === true) ?
                        <Loading fontSize={50} color={"orange"} />
                        :
                        <form onSubmit={this.onSubmit}>

                            <div className="input-group mb-3">
                                <input
                                    placeholder="Ancien mot de passe"
                                    type="password"
                                    className="form-control"
                                    onChange={this.onChange}
                                    name="oldPassword"
                                    value={oldPassword}
                                    required={true}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    placeholder="Nouveau mot de passe "
                                    type="password"
                                    className="form-control"
                                    onChange={this.onChange}
                                    name="newPassword1"
                                    value={newPassword1}
                                    required={true}
                                />
                            </div>
                            <div className="input-group mb-3">
                                <input
                                    placeholder="Confirmation"
                                    type="password"
                                    className="form-control"
                                    onChange={this.onChange}
                                    name="newPassword2"
                                    value={newPassword2}
                                    required={true}
                                />
                            </div>

                            {   /*checking for errors*/
                                (this.state.error !== "") ? (errorsMessage(this.state.error)) : null
                            }
                            <div className="modal-footer">
                                <Button variant="warning" className='shadow-1  font-weight-bold' type="submit" > Valider   </Button>
                                <Button
                                    className="ml-auto shadow-1  font-weight-bold"
                                    variant="link"
                                    type="button"
                                    onClick={() => this.handleOk()}
                                >
                                    fermer
                             </Button>
                            </div>
                        </form>
                    }

                </Modal>
            </>
        );
    }
}

const errorsMessage = error => {
    return (<Alert className=" mb-0, pt-1 pb-1 mb-1 text-center" variant="warning">
        <i className="fa fa-exclamation-triangle" aria-hidden="true"></i> {error}
    </Alert>)
}

const mapDispatchToProps = {
    changePassword
};
const mapStateToProps = (state) => ({
    isChangingPwd: state.auth.isLoading,
    // ApiErrors: state.errors.msg,
    msg: state.messages.error.msg
});

export default connect(mapStateToProps, mapDispatchToProps)(ChangePwd)
