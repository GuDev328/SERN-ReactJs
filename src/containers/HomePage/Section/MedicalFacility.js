import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions'
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import * as actions from '../../../store/actions'
import { Link } from 'react-router-dom';


class MedicalFacility extends Component {

    componentDidMount() {
        this.props.getAllClinic()
    }

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    render() {
        let clinics = this.props.clinics
        var settings = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1
        };
        return (

            <div>
                <div className='section' style={{ backgroundColor: "#efefef" }}>
                    <div className='section-header'>
                        <div className='section-title'><FormattedMessage id="section-specialty.medical-facility" /></div>
                        <div className='show-more'><FormattedMessage id="section-specialty.search" /></div>
                    </div>
                    <div className='section-content'>
                        <Slider {...settings}>
                            {clinics && clinics.length > 0 &&
                                clinics.map((item, index) => {
                                    let imgBase64 = ''
                                    if (item.avt) {
                                        imgBase64 = new Buffer(item.avt, 'base64').toString('binary')
                                    }
                                    return <Link to={{ pathname: '/detail-clinic', state: { data: item } }}>
                                        <div className='div-section'>
                                            <img className='img-cus' src={imgBase64} />
                                            <p className='img-title'>{item.name}</p>
                                        </div></Link>

                                })

                            }
                        </Slider>
                    </div>
                </div>
            </div>
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        language: state.app.language,
        clinics: state.admin.clinics
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang)),
        getAllClinic: () => dispatch(actions.fetchAllClinicsStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
