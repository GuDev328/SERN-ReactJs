import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss'
import './Handbook.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axn from '../../../assets/handbook/anh-xet-nghiem.png'
import khh from '../../../assets/handbook/kham-ho-hap-o-dau-tot-tphcm.png'
import vip12 from '../../../assets/handbook/review-phong-kham-da-khoavip12.png'
import ttth from '../../../assets/handbook/review-trung-tam-tieu-hoa-doctor-check.png'


class DoctorWeek extends Component {

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 2,
            slidesToScroll: 1
        };
        return (
            <React.Fragment>
                <div className='section handbook'>
                    <div className='section-header'>
                        <div className='section-title'>Cẩm nang</div>
                        <div className='show-more'>Tất cả bài viết</div>
                    </div>
                    <div className='section-content'>
                        <Slider {...settings}>
                            <div className='div-section'>
                                <img className='img-cus' src={axn} />
                                <p className='img-title'>Khám tầm soát ung thư vòm họng ở đâu tốt tại Hà Nội?</p>
                            </div>

                            <div className='div-section'>
                                <img className='img-cus' src={khh} />
                                <p className='img-title'>Review Phòng khám VIP 12: Bác sĩ giỏi? Thế mạnh thăm khám?</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={vip12} />
                                <p className='img-title'>Review Trung tâm Tiêu hóa Doctor Check có tốt không? Lưu ý đi khám </p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={ttth} />
                                <p className='img-title'>8 bệnh viện, phòng khám Hô hấp uy tín tại TP.HCM</p>
                            </div>
                        </Slider>
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorWeek);
