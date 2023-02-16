import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './DoctorSchedule.scss'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../../services'
import { languages, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions'
import moment from 'moment'
import localization from 'moment/locale/vi'

class DoctorSchedule extends Component {

    constructor(props) {
        super(props)
        this.state = {
            arrDate: [],
            arrTime: [],
            date: moment(moment(new Date()).add(0, 'day').startOf('day').valueOf()).format("YYYY-MM-DD")
        }
    }

    capitalizeFirstLetter = (string) => {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    async componentDidMount() {
        let arrDate = []
        for (let i = 0; i < 7; i++) {
            let obj = {}
            if (this.props.language === 'vi') {
                let dayVi = moment(new Date()).add(i, 'day').format('dddd - DD/MM')
                obj.label = this.capitalizeFirstLetter(dayVi)
            } else {
                obj.label = moment(new Date()).locale('en').add(i, 'day').format('ddd - DD/MM')
            }

            obj.value = moment(moment(new Date()).add(i, 'day').startOf('day').valueOf()).format("YYYY-MM-DD");
            arrDate.push(obj)
            arrDate[0].label = 'Hôm nay - ' + moment(new Date()).format('DD/MM')
        }
        this.setState({
            arrDate: arrDate
        })
        let response = await userService.getSchedule(this.props.doctorId, this.state.date)
        this.setState({
            arrTime: response.response.data
        }, () => console.log(this.state.arrTime))
    }

    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    handleOnChangeDateSelect = async (event) => {
        this.setState({
            date: event.target.value,
        }, async () => {
            let response = await userService.getSchedule(this.props.doctorId, this.state.date)
            console.log(response)
            this.setState({
                arrTime: response.response.data
            }, () => console.log(this.state.arrTime))
        })

    }

    render() {
        let arrDate = this.state.arrDate
        let arrTime = this.state.arrTime
        return (
            <div className='doctor-schedule-container'>
                <div className='choose-date'>
                    <select className='date-select'
                        onChange={(event) => this.handleOnChangeDateSelect(event)}
                        value={this.state.dateTimestamp}
                    >
                        {arrDate && arrDate.length > 0 &&
                            arrDate.map((item, index) => {
                                return (<option className='date' key={index} value={item.value}>{item.label}</option>)
                            })}


                    </select>
                </div>
                <div className='content-date'><i className="fas fa-calendar-alt"></i> LỊCH KHÁM</div>
                <div className='time'>
                    {!arrTime || arrTime.length === 0 &&
                        'Bác sĩ không có lịch hẹn cho ngày này, vui lòng chọn ngày khác!'
                    }
                    {arrTime && arrTime.length > 0 &&
                        arrTime.map((item, index) => {
                            let time = this.props.language === 'vi' ? item.timeData.valueVi : item.timeData.valueEn
                            return <div className='btn btn-time'>{time}</div>
                        })

                    }
                    {arrTime && arrTime.length > 0 &&
                        <div className='text-choose-time'>Chọn <i class="far fa-hand-point-up"></i> và đặt (Phí đặt lịch 0đ)</div>
                    }

                </div>
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,
    };
};
const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
