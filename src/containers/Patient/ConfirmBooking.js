import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './ConfirmBooking.scss'
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { userService } from '../../services'
import { languages, CommonUtils } from '../../utils';
import * as actions from '../../store/actions'
import HeaderHome from '../HomePage/HeaderHome';
import FooterHome from '../HomePage/FooterHome'
import moment from 'moment';
import Select from 'react-select';
import { withRouter } from 'react-router';
import { useParams } from 'react-router-dom';
import logo from "../../../src/assets/logo.svg"

class Booking extends Component {

    constructor(props) {
        super(props)
        this.state = {
            bookingId: null,
            patientId: null,
            success: false,
            errCode: -10
        }
    }


    async componentDidMount() {
        const searchParams = new URLSearchParams(window.location.search);
        this.setState({
            bookingId: searchParams.get('bookingId'),
            patientId: searchParams.get('patientId'),
            userInfo: this.props.userInfo,
            isLoggedIn: this.props.isLoggedIn
        }, () => {

        })

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.isLoggedIn !== this.props.isLoggedIn) {
            this.setState({
                isLoggedIn: this.props.isLoggedIn,
            })
        }
        if (prevProps.userInfo !== this.props.userInfo) {
            this.setState({
                userInfo: this.props.userInfo,
            })
        }
    }

    process = async () => {
        if (this.state.bookingId && this.state.patientId && this.state.isLoggedIn && this.state.userInfo) {
            let data = {
                bookingId: this.state.bookingId,
                patientId: this.state.patientId,
                userId: this.state.userInfo.id
            }
            let response = await userService.confirmBookingAppointment(data)
            if (this.state.errCode !== response.errCode) {
                this.setState({
                    success: true,
                    errCode: response.errCode
                })
            }

        }
    }

    render() {
        this.process()
        let redirectlogin = `http://localhost:3000/login?redirect=%2Fconfirm-booking?bookingId=${this.state.bookingId}%26patientId=${this.state.patientId}`
        return (
            <div>
                <HeaderHome />
                {!this.state.isLoggedIn &&
                    <div className='errlogin'><div className='icon-errlogin'><i class="fas fa-times-circle"></i></div>
                        <h3 className='err-title'>Bạn cần đăng nhập</h3>
                        <p>Bạn hãy đăng nhập và thử lại.
                        </p>
                        <Button className='px-3' color="primary" ><a href={redirectlogin}>Đăng nhập</a></Button>
                    </div>
                }

                {this.state.userInfo && ((this.state.patientId != this.state.userInfo.id) || this.state.errCode == 1) &&
                    <div className='errlogin'><div className='icon-errlogin'><i class="fas fa-times-circle"></i></div>
                        <h3 className='err-title'>Sai tài khoản</h3>
                        <p>Bạn hãy đăng nhập đúng tài khoản đã đặt lịch hẹn và thử lại.
                        </p>
                        <Button className='px-3' color="primary" onClick={this.props.processLogout} >Đăng xuất</Button>
                    </div>
                }
                {this.state.success && (this.state.errCode == 0 || this.state.errCode == 3) &&
                    <div className='errlogin'><div className='icon-suscess'><i class="far fa-check-circle"></i></div>
                        <h3 className='err-title'>Xác nhận lịch khám thành công</h3>
                        <p>Chúc mừng bạn đã xác nhận thành công lịch hẹn.Thông tin lịch hẹn chúng tôi đã gửi cho bạn qua gmail.
                        </p>
                    </div>
                }

                {this.state.success && (this.state.errCode == 2 || this.state.errCode == 4) &&
                    <div className='errlogin'><div className='icon-notfound'><i class="fas fa-times-circle"></i></div>
                        <h3 className='err-title'>Không tìm thấy lịch hẹn</h3>
                        <p>Lịch hẹn này có thể đã hoàn thành hoặc bị huỷ</p>
                    </div>
                }

                {this.state.success && (this.state.errCode == 5) &&
                    <div className='errlogin'><div className='icon-notfound'><i class="fas fa-times-circle"></i></div>
                        <h3 className='err-title'>Lịch hẹn này đã đầy chỗ</h3>
                        <p>Xin lỗi bạn vì sự bất tiện này. Số người đặt lịch khám này quá đông. Vui lòng chọn lịch hẹn khác.</p>
                    </div>
                }

                {this.state.success && (this.state.errCode == -1) &&
                    <div className='errlogin'><div className='icon-errlogin'><i class="fas fa-times-circle"></i></div>
                        <h3 className='err-title'>Lỗi Server</h3>
                        <p>Xin lỗi bạn vì sự bất tiện này. Server đang nâng cấp hoặc gặp sự cố. Bạn vui lòng thử lại sau.</p>
                    </div>
                }
                <FooterHome />
            </div>
        )
    }

}


const mapStateToProps = state => {
    return {
        language: state.app.language,
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};
const mapDispatchToProps = dispatch => {
    return {
        //getDetailDoctor: (doctorId) => dispatch(actions.fetchDetailDoctorsStart(doctorId)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
