import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FooterHome.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'

class FooterHome extends Component {

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    render() {
        return (
            <React.Fragment>
                <div className='footer-container'>
                    <div className='footer-content'>
                        <div className='colum1'>
                            <div className='logo'>
                                <img src='https://bookingcare.vn/assets/icon/bookingcare-2020.svg'></img>
                            </div>
                            <div className='title-cl1'>Công ty Cổ phần Công nghệ BookingCare</div>
                            <div> <i class="fas fa-map-marker-alt"></i> 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
                            <div><i class="fas fa-check"></i> ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</div>
                            <div>
                                <img className='bct' src='https://bookingcare.vn/assets/icon/bo-cong-thuong.svg'></img>
                                <img className='bct' src='https://bookingcare.vn/assets/icon/bo-cong-thuong.svg'></img>
                            </div>
                        </div>
                        <div className='colum2'>
                            <div className='ul-li'>Liên hệ hợp tác</div>
                            <div className='ul-li'>Gói chuyển đổi số doanh nghiệp</div>
                            <div className='ul-li'>Tuyển dụng</div>
                            <div className='ul-li'>Câu hỏi thường gặp</div>
                            <div className='ul-li'>Điều khoản sử dụng</div>
                            <div className='ul-li'>hính sách Bảo mật</div>
                            <div className='ul-li'>Quy trình hỗ trợ giải quyết khiếu nại</div>
                            <div className='ul-li'>Quy chế hoạt động</div>
                        </div>
                        <div className='colum3'>
                            <div className='title-cl3'>Trụ sở tại Hà Nội</div>
                            <div className='descpt'>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>

                            <div className='title-cl3'>Văn phòng tại TP Hồ Chí Minh</div>
                            <div className='descpt'>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>

                            <div className='title-cl3'>Hỗ trợ khách hàng</div>
                            <div className='descpt'>support@bookingcare.vn (7h30 - 18h)</div>
                        </div>
                    </div>
                    <div className='download'>
                        <i class="fas fa-mobile-alt"></i> Tải ứng dụng BookingCare cho điện thoại hoặc máy tính bảng: <span className='linkdown'>Android</span>- <span className='linkdown'>iPhone/iPad</span>- <span className='linkdown'>Khác</span>
                    </div>
                </div>
            </React.Fragment >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(FooterHome);
