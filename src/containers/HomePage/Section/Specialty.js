import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import cxk from '../../../assets/speciality/section-co-xuong-khop.jpg'
import tk from '../../../assets/speciality/section-than-kinh.jpg'
import th from '../../../assets/speciality/section-tieu-hoa.jpg'
import tm from '../../../assets/speciality/section-tim-mach.jpg'
import tmh from '../../../assets/speciality/section-tai-mui-hong.jpg'
import cs from '../../../assets/speciality/section-cot-song.jpg'

class Specialty extends Component {

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
                <div className='section'>
                    <div className='section-header'>
                        <div className='section-title'><FormattedMessage id="section-specialty.specialty-popular" /></div>
                        <div className='show-more'><FormattedMessage id="section-specialty.showmore" /></div>
                    </div>
                    <div className='section-content'>
                        <Slider {...settings}>
                            <div className='div-section'>
                                <img className='img-cus' src={cxk} />
                                <p className='img-title'>Cơ xương khớp</p>
                            </div>

                            <div className='div-section'>
                                <img className='img-cus' src={tk} />
                                <p className='img-title'>Thần kinh</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={th} />
                                <p className='img-title'>Tiêu hoá</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={tm} />
                                <p className='img-title'>Tim mạch</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={tmh} />
                                <p className='img-title'>Tai mũi họng</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={cs} />
                                <p className='img-title'>Cột sống</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
