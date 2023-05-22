import React, { Component } from 'react';
import './ModalShowDetailPatient.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import logo from "../../../../src/assets/logo.svg"

class ModalAskLogin extends Component {
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
        let data = this.props.data
        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='lg'
                className={'abc'}>
                <ModalHeader toggle={() => this.toggle()}>Thông tin chi tiết</ModalHeader>
                <ModalBody>
                    <div className='info-container'>
                        <div><b>Họ và tên: </b>{data.PatientInfo.name}</div>
                        <div><b>Giới tính: </b>{data.PatientInfo.genderPatientData.valueVi}</div>
                        <div><b>Ngày sinh: </b>{data.PatientInfo.dob}</div>
                        <div><b>Địa chỉ : </b>{data.PatientInfo.address}</div>
                        <div><b>Số điện thoại: </b>{data.PatientInfo.phoneNumber}</div>
                        <div><b>Email: </b>{data.User.email}</div>
                        <div><b>Thời gian khám: </b>{data.Schedule.timeData.valueVi}</div>
                        <div><b>Lý do khám: </b>{data.PatientInfo.reason}</div>
                        <div><b>Trạng thái: </b>{data.statusData.valueVi}</div>
                    </div>
                </ModalBody>
                <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter>
            </Modal >
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
