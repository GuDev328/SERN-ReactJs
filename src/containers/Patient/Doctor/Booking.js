import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './Booking.scss'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../../services'
import { languages, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import HeaderHome from '../../HomePage/HeaderHome';
import FooterHome from '../../HomePage/FooterHome'
import moment from 'moment';
import Select from 'react-select';
import ModalAskLogin from '../../System/ModalAskLogin';
import { withRouter } from 'react-router';
class Booking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            data: this.props.location.state.item,
            arrGender: [],
            selectedGender: null,
            fullName: '',
            phoneNumber: '',
            dob: '',
            address: '',
            reason: '',
            isOpenAskLogin: false
        }
    }


    async componentDidMount() {
        this.props.getDetailDoctor(this.state.data.doctorId)
        this.props.getGenderStart()

    }


    arrToSelectOption = (arr) => {
        let options = []
        let { language } = this.props
        if (arr && arr.length > 0) {
            arr.map((item, index) => {
                let object = {}
                object.label = language == 'vi' ? item.valueVi : item.valueEn
                object.value = item.keyMap
                options.push(object)
            })
        }
        return options
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            let listGender = this.arrToSelectOption(this.props.genders)
            this.setState({
                arrGender: listGender,
            })
        }
        if (prevProps.language !== this.props.language) {
            let listGender = this.arrToSelectOption(this.props.genders)
            this.setState({
                arrGender: listGender,
            })
        }
    }
    toggleAsk = () => {
        this.setState({
            isOpenAskLogin: !this.state.isOpenAskLogin
        })
    }
    handleChangeGender = (selectedGender) => {
        this.setState({ selectedGender })
    }
    handleChangeName = (event) => {
        this.setState({ fullName: event.target.value })
    }
    handleChangePhoneNumber = (event) => {
        this.setState({ phoneNumber: event.target.value })
    }
    handleChangeDOB = (event) => {
        this.setState({ dob: event.target.value })
    }
    handleChangeAddress = (event) => {
        this.setState({ address: event.target.value })
    }
    handleChangeReason = (event) => {
        this.setState({ reason: event.target.value })
    }
    dataValidation = () => {
        if (!this.state.data || !this.state.selectedGender || !this.state.fullName
            || !this.state.phoneNumber || !this.state.dob || !this.state.address || !this.state.reason) {
            alert("Vui lòng nhập đầy đủ các thông tin")
            return false
        } else {
            return true
        }
    }
    handleOnClickConfirm = async () => {
        if (!this.props.isLoggedIn) {
            this.setState({ isOpenAskLogin: true })
            //this.props.history.push(`/login`)
        } else {
            if (this.dataValidation()) {
                let data = {
                    doctorId: this.state.data.doctorId,
                    patientId: this.props.userInfo.id,
                    timeType: this.state.data.timeType,
                    timeData: this.state.data.timeData,
                    date: this.state.data.date,
                    patientPhoneNumber: this.state.phoneNumber,
                    patientName: this.state.fullName,
                    patientGender: this.state.selectedGender.value,
                    patientDob: this.state.dob,
                    patientAddress: this.state.address,
                    patientReason: this.state.reason,
                    language: this.props.language
                }
                let response = await userService.bookingAppointment(data)
                alert(response.errMessage)
            }
        }
    }
    render() {
        let detailDoctor = this.props.detailDoctor
        let priceVi = (detailDoctor.DoctorInfo) ? detailDoctor.DoctorInfo.priceData.valueVi : ''
        let priceEn = (detailDoctor.DoctorInfo) ? detailDoctor.DoctorInfo.priceData.valueEn : ''
        let price = this.props.language === 'vi' ? priceVi : priceEn
        let titleDoctor = 'loading...'
        if (detailDoctor.positionData) {
            if (this.props.language === 'vi') {
                titleDoctor = detailDoctor.positionData.valueVi + ' ' +
                    detailDoctor.lastName + ' ' +
                    detailDoctor.firstName
            } else {
                titleDoctor = detailDoctor.positionData.valueEn + ' ' +
                    detailDoctor.firstName + ' ' +
                    detailDoctor.lastName
            }
        }
        let timeVi = this.state.data.timeData.valueVi + " - " + moment(this.state.data.date).locale('vi').format('dddd- DD/MM/yyyy').charAt(0).toUpperCase() + moment(this.state.data.date).format('dddd- DD/MM/yyyy').slice(1)
        let timeEn = this.state.data.timeData.valueEn + " - " + moment(this.state.data.date).locale('en').format('ddd- DD/MM/yyyy')
        let time = this.props.language === 'vi' ? timeVi : timeEn
        return (
            <div>
                <HeaderHome />
                <ModalAskLogin isOpen={this.state.isOpenAskLogin}
                    toggle={this.toggleAsk} />
                <div className='booking'>
                    <div className='booking-container'>
                        <div className='doctor'>
                            <div className='avt'>
                                <img className='img-cus' src={detailDoctor.image} />
                            </div>
                            <div className='doctor-content'>
                                <div className='text-booking'><FormattedMessage id='booking.bookingappointment' /></div>
                                <div className='title-doctor'>{titleDoctor}</div>
                                <div className='time'>{time}</div>
                            </div>
                        </div>
                        <div className='inputInfo'>
                            <div className='row-user'>
                                <div className='name'>
                                    <i class="icon fas fa-user"></i>
                                    <span className='name-titl'><FormattedMessage id='booking.name' /></span>
                                    <input type='text' className=' form-control'
                                        value={this.state.fullName}
                                        onChange={(event) => this.handleChangeName(event)} ></input>
                                </div>
                                <div className='gender'>
                                    <i class="icon fas fa-venus-mars"></i>
                                    <span className='name-titl'><FormattedMessage id='booking.gender' /></span>
                                    <Select
                                        value={this.state.selectedGender}
                                        onChange={this.handleChangeGender}
                                        options={this.state.arrGender}
                                    />
                                </div>
                            </div>

                            <i class="icon fas fa-phone-square"></i>
                            <span className='name-titl'><FormattedMessage id='booking.phoneNumber' /></span>
                            <input type='text' className=' form-control'
                                value={this.state.phoneNumber}
                                onChange={(event) => this.handleChangePhoneNumber(event)}></input>

                            <i class="icon fas fa-calendar-alt"></i>
                            <span className='name-titl'><FormattedMessage id='booking.dob' /></span>
                            <input type='date' className=' form-control'
                                value={this.state.date}
                                onChange={(event) => this.handleChangeDOB(event)}></input>

                            <i class=" icon fas fa-map-marker-alt"></i>
                            <span className='name-titl'><FormattedMessage id='booking.address' /></span>
                            <input type='text' className=' form-control'
                                value={this.state.address}
                                onChange={(event) => this.handleChangeAddress(event)}></input>

                            <i class="icon fas fa-plus-circle"></i>
                            <span className='name-titl'><FormattedMessage id='booking.reason' /></span>
                            <textarea rows={4} type='text' className=' form-control'
                                value={this.state.reason}
                                onChange={(event) => this.handleChangeReason(event)}></textarea>
                        </div>

                        <div className='payment'>
                            <div className='text-payment'><FormattedMessage id='booking.payment' /></div>
                            <input type='radio' checked id='abcd' />
                            <label for='abcd' className='text-payment2'><FormattedMessage id='booking.wherepayment' /></label>
                        </div>
                        <div className='backgr-cost'>
                            <div className='cost-block'>
                                <div className='cost'>
                                    <div><FormattedMessage id='booking.cost' /></div>
                                    <div>{price}</div>
                                </div>
                                <div className='cost'>
                                    <div><FormattedMessage id='booking.bookingfee' /></div>
                                    <div><FormattedMessage id='booking.free' /></div>
                                </div>
                                <hr></hr>
                                <div className='cost'>
                                    <div><FormattedMessage id='booking.total' /></div>
                                    <div className='cost-total'>{price}</div>
                                </div>
                            </div>
                        </div>
                        <div className='note'><FormattedMessage id='booking.note1' /></div>
                        <div className='btn btn-cus'
                            onClick={this.handleOnClickConfirm}><FormattedMessage id='booking.confirm' /></div>
                        <div className='note'><div className='note2'><FormattedMessage id='booking.note2' /></div></div>
                    </div>
                </div>
                <FooterHome />
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        detailDoctor: state.admin.detailDoctor,
        genders: state.admin.genders,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        getDetailDoctor: (doctorId) => dispatch(actions.fetchDetailDoctorsStart(doctorId)),
        getGenderStart: () => dispatch(actions.fetchGenderStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
