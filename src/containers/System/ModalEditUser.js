import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';

class ModalEditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            id: this.props.userDataEdit.id,
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: ''
        }

    }


    componentDidMount() {
        this.setState({

            firstName: this.props.userDataEdit.firstName,
            lastName: this.props.userDataEdit.lastName,
            address: this.props.userDataEdit.address,
            phoneNumber: this.props.userDataEdit.phoneNumber,
            gender: this.props.userDataEdit.gender + '',
            roleId: this.props.userDataEdit.roleId + '',
        })
    }

    toggle = () => {
        this.props.toggle()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }
    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['firstName', 'lastName', 'address', 'phoneNumber', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert("Missing parameter: " + arrInput[i])
                break
            }
        }
        return isValid
    }
    handleEditUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.props.editUser(this.state)
        }
    }
    render() {
        console.log(this.state)
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
                className={'abc'}>
                <ModalHeader toggle={() => this.toggle()}>Edit a user</ModalHeader>
                <ModalBody>

                    <div className="container">
                        <div className='row'>
                            <div className="form-group col-6">
                                <label for="">First Name</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'firstName')} value={this.state.firstName} type="text" className="form-control" name="firstName" placeholder="First Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="">Last Name</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'lastName')} value={this.state.lastName} type="text" className="form-control" name="lastName" placeholder="Last Name" />
                            </div>
                        </div>

                        <label for="">Address</label>
                        <input onChange={(event) => this.handleOnChangeInput(event, 'address')} value={this.state.address} type="text" className="form-control" name="address" placeholder="1234 Main St" />

                        <div className='row'>
                            <div className="form-group col-5">
                                <label for="">Phone Number</label>
                                <input onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} value={this.state.phoneNumber} type="text" className="form-control" name="phoneNumber" />
                            </div>
                            <div className="form-group col-4">
                                <label for="">Gender</label>
                                <select onChange={(event) => this.handleOnChangeInput(event, 'gender')} value={this.state.gender} name="gender" className="form-control">
                                    <option selected value="">-Choose-</option>
                                    <option value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label for="">Role</label>
                                <select onChange={(event) => this.handleOnChangeInput(event, 'roleId')} value={this.state.roleId} name="roleId" className="form-control">
                                    <option selected value="">-Choose-</option>
                                    <option value="R1">Admin</option>
                                    <option value="R2">Doctor</option>
                                    <option value="R3">Patient</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => this.handleEditUser()}>Save Change</Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalEditUser);
