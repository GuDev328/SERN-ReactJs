import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss'
import './DoctorWeek.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import avt from '../../../assets/imgrac.jpg'


class DoctorWeek extends Component {

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    render() {
        var settings = {
            dots: false,
            infinite: true,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (
            <React.Fragment>
                <div className='section doctorweek'>
                    <div className='section-header'>
                        <div className='section-title'>Bác sĩ nổi bật tuần qua</div>
                        <div className='show-more'><FormattedMessage id="section-specialty.search" /></div>
                    </div>
                    <div className='section-content'>
                        <Slider {...settings}>
                            <div className='div-section'>
                                <img className='img-cus' src={avt} />
                                <p className='img-title'>PGS, TS, Giảng viên cao cấp Trần Hữu Bình</p>
                                <p className='speciality-of-doctor'>Sức khoẻ tâm thần</p>
                            </div>

                            <div className='div-section'>
                                <img className='img-cus' src={avt} />
                                <p className='img-title'>Phó Giáo sư, Tiến sĩ, Bác sĩ cao cấp Nguyễn Duy Hưng</p>
                                <p className='speciality-of-doctor'>Da liễu</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={avt} />
                                <p className='img-title'>Khám Tại Trung Tâm Tiêu hóa Doctor Check</p>
                                <p className='speciality-of-doctor'>Tiêu hoá</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={avt} />
                                <p className='img-title'>Giáo sư, Tiến sĩ Hà Văn Quyết</p>
                                <p className='speciality-of-doctor'>Tiêu hoá- Viêm gan</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={avt} />
                                <p className='img-title'>Bác sĩ Chuyên khoa I Nguyễn Trọng Tuân</p>
                                <p className='speciality-of-doctor'>Sức khoẻ tâm thần</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={avt} />
                                <p className='img-title'>Phó Giáo sư, Tiến sĩ, Bác sĩ Nguyễn Thị Hoài An</p>
                                <p className='speciality-of-doctor'>Tai mũi họng</p>
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
