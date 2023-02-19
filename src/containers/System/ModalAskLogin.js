import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { emitter } from '../../utils/emitter'
import { withRouter } from 'react-router';

class ModalAskLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        }

        this.listenToEmitter();
    }

    listenToEmitter() {
        emitter.on('EVENT_CLEAR_MODAL_DATA', () => {
            this.setState({

            })
        })
    }

    componentDidMount() {

    }

    toggle = () => {
        this.props.toggle()
    }
    handelOnClickLogin = () => {
        this.props.history.push(`/login`)
    }
    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='md'
                className={'abc'}>
                {/* <ModalHeader toggle={() => this.toggle()}>Register a new user</ModalHeader> */}
                <ModalBody>

                    <div>Vui lòng đăng nhập để tiếp tục </div>
                    <Button className='px-3' color="primary" onClick={() => this.handelOnClickLogin()}>Đăng nhập</Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Ở lại</Button>
                </ModalBody>
                {/* <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => this.handleAddANewUser()}>Register</Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter> */}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalAskLogin));
