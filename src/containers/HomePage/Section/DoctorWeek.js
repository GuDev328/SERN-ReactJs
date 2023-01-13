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
import * as actions from '../../../store/actions'
import { Redirect } from 'react-router-dom';
import { withRouter } from 'react-router';

class DoctorWeek extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrTopDoctors: [],
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                arrTopDoctors: this.props.topDoctors
            })
        }
    }

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    componentDidMount() {
        this.props.loadTopDoctors()
    }
    handleViewDetailDoctor = (id) => {
        this.props.history.push(`/doctor/${id}`)
    }

    render() {
        let topDoctors = this.state.arrTopDoctors
        var settings = {
            dots: false,
            infinite: false,
            speed: 300,
            slidesToShow: 4,
            slidesToScroll: 1,
        };
        return (
            <React.Fragment>
                <div className='section doctorweek'>
                    <div className='section-header'>
                        <div className='section-title'><FormattedMessage id="homepage.outStandingDoctor" /></div>
                        <div className='show-more'><FormattedMessage id="section-specialty.search" /></div>
                    </div>
                    <div className='section-content'>
                        <Slider {...settings}>
                            {topDoctors && topDoctors.length > 0 &&
                                topDoctors.map((item, index) => {
                                    let imgBase64 = ''
                                    if (item.image) {
                                        imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    let doctorNameVi = item.lastName + ' ' + item.firstName;
                                    let doctorNameEn = item.firstName + ' ' + item.lastName;
                                    return (
                                        <div className='div-section' onClick={() => this.handleViewDetailDoctor(item.id)}>
                                            <img className='img-cus' src={imgBase64} />
                                            <p className='img-title'>{this.props.language == languages.VI ? item.positionData.valueVi + ', ' + doctorNameVi : item.positionData.valueEn + ', ' + doctorNameEn} </p>
                                            <p className='speciality-of-doctor'>Sức khoẻ tâm thần</p>
                                        </div>
                                    )
                                })
                            }

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
        topDoctors: state.admin.topDoctors
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadTopDoctors: () => dispatch(actions.fetchTopDoctorsStart()),
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DoctorWeek));
