import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
class ModalUser extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    toggle = () => {
        this.props.toggle()
    }

    render() {
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
                className={'abc'}>
                <ModalHeader toggle={() => this.toggle()}>Create a new user</ModalHeader>
                <ModalBody>

                    <div className="container">
                        <div className="row">
                            <div className="form-group col-6">
                                <label for="">Email</label>
                                <input type="email" className="form-control" name="email" placeholder="Email" />
                            </div>
                            <div className="form-group col-6">
                                <label for="">Password</label>
                                <input type="password" className="form-control" name="password" placeholder="Password" />
                            </div>
                        </div>
                        <div className='row'>
                            <div className="form-group col-6">
                                <label for="">First Name</label>
                                <input type="text" className="form-control" name="firstName" placeholder="First Name" />
                            </div>
                            <div className="form-group col-md-6">
                                <label for="">Last Name</label>
                                <input type="text" className="form-control" name="lastName" placeholder="Last Name" />
                            </div>
                        </div>

                        <label for="">Address</label>
                        <input type="text" className="form-control" name="address" placeholder="1234 Main St" />

                        <div className='row'>
                            <div className="form-group col-5">
                                <label for="">Phone Number</label>
                                <input type="text" className="form-control" name="phoneNumber" />
                            </div>
                            <div className="form-group col-4">
                                <label for="">Gender</label>
                                <select name="gender" className="form-control">
                                    <option selected value="1">Male</option>
                                    <option value="0">Female</option>
                                </select>
                            </div>
                            <div className="form-group col-3">
                                <label for="">Role</label>
                                <select name="roleId" className="form-control">
                                    <option selected value="R3">Patient</option>
                                    <option value="R2">Doctor</option>
                                    <option value="R1">Admin</option>
                                </select>
                            </div>
                        </div>
                    </div>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={() => this.toggle()}>Do Something</Button>{' '}
                    <Button color="secondary" onClick={() => this.toggle()}>Cancel</Button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
