import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './DoctorClinic.scss'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../../services'
import { languages, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import moment from 'moment'
import localization from 'moment/locale/vi'

class DoctorClinic extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showDetail: false
        }
    }


    async componentDidMount() {
        this.props.getDetailDoctor(this.props.doctorId)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }



    render() {
        let detailDoctor = this.props.detailDoctor
        let priceVi = (detailDoctor.DoctorInfo) ? detailDoctor.DoctorInfo.priceData.valueVi : ''
        let priceEn = (detailDoctor.DoctorInfo) ? detailDoctor.DoctorInfo.priceData.valueEn : ''
        let price = this.props.language === 'vi' ? priceVi : priceEn
        let paymentVi = (detailDoctor.DoctorInfo) ? detailDoctor.DoctorInfo.paymentData.valueVi : ''
        let paymentEn = (detailDoctor.DoctorInfo) ? detailDoctor.DoctorInfo.paymentData.valueEn : ''
        let payment = this.props.language === 'vi' ? paymentVi : paymentEn
        return (
            <div className='doctor-clinic-container'>
                <div className='addtitl'><FormattedMessage id='doctorClinic.address' /></div>
                <div className='clinic-name'>{detailDoctor.DoctorInfo ? detailDoctor.DoctorInfo.nameClinic : ''}</div>
                <div className='addr'>{detailDoctor.DoctorInfo ? detailDoctor.DoctorInfo.addressClinic : ''}</div>
                <div className='cost'>
                    <div className='addtitl'><FormattedMessage id='doctorClinic.cost' /></div>
                    <div hidden={this.state.showDetail} className='price'>{price}</div>
                    {this.state.showDetail === false &&
                        <div className='show-detail'
                            onClick={() => { this.setState({ showDetail: true }) }}
                        ><FormattedMessage id='doctorClinic.showDetail' /></div>
                    }

                </div>
                {this.state.showDetail &&
                    <div className='detail'>
                        <div className='tit-price'>
                            <div className='left'><FormattedMessage id='doctorClinic.cost' /></div>
                            <div className='right'>{price}</div>
                        </div>
                        <div className='des'><FormattedMessage id='doctorClinic.des' /> {priceEn}</div>
                        <div className='des-pay'><FormattedMessage id='doctorClinic.despay' />{payment}</div>
                        <div className='hide-detail'
                            onClick={() => { this.setState({ showDetail: false }) }}>Ẩn chi tiết</div>
                    </div>
                }
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (doctorId) => dispatch(actions.fetchDetailDoctorsStart(doctorId)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorClinic);
