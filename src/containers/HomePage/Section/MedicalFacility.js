import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import bvvd from '../../../assets/medicalfacility/bv-viet-duc.jpg'
import bvcr from '../../../assets/medicalfacility/bv-cho-ray-h1.jpg'
import dhyd1 from '../../../assets/medicalfacility/pk-dhyd1.jpg'
import bvk from '../../../assets/medicalfacility/bvk.jpg'
import bvhv from '../../../assets/medicalfacility/bv-hung-viet.jpg'
import bvtc from '../../../assets/medicalfacility/bv-thu-cuc-1.jpg'

class MedicalFacility extends Component {

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
                <div className='section' style={{ backgroundColor: "#efefef" }}>
                    <div className='section-header'>
                        <div className='section-title'><FormattedMessage id="section-specialty.medical-facility" /></div>
                        <div className='show-more'><FormattedMessage id="section-specialty.search" /></div>
                    </div>
                    <div className='section-content'>
                        <Slider {...settings}>
                            <div className='div-section'>
                                <img className='img-cus' src={bvvd} />
                                <p className='img-title'>Bệnh viên Hữu nghị Việt Đức</p>
                            </div>

                            <div className='div-section'>
                                <img className='img-cus' src={bvcr} />
                                <p className='img-title'>Bệnh viện Chợ rẫy</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={dhyd1} />
                                <p className='img-title'>Phòng khám Bệnh viện Đại học y dược 1</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={bvk} />
                                <p className='img-title'>Bệnh viện K- Cơ sở Phan Chu Trinh</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={bvhv} />
                                <p className='img-title'>Bệnh viện Ung bướu Hưng Việt</p>
                            </div>
                            <div className='div-section'>
                                <img className='img-cus' src={bvtc} />
                                <p className='img-title'>Hệ thống Y tế Thu Cúc TCI</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
