import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailSpecialty.scss'
import { FormattedMessage } from 'react-intl'
import { userService } from '../../services';
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DoctorSchedule from '../Patient/Doctor/DoctorSchedule'
import DoctorClinic from '../Patient/Doctor/DoctorClinic'
import FooterHome from '../HomePage/FooterHome'

class DetailSpecialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.location.state.data,
            arrDoctor: []
        }
    }

    async componentDidMount() {
        let listDetailDoctor = await userService.getListDetailDoctorBySpecialty(this.state.data.id)
        let getArrDoctor = []
        if (listDetailDoctor.errCode === 0 && listDetailDoctor.data.length > 0) {
            getArrDoctor = listDetailDoctor.data
        }
        this.setState({
            arrDoctor: getArrDoctor
        })

    }

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    handleOnClickSpecialty = (item) => {

    }

    render() {
        let arrDoctor = this.state.arrDoctor
        let imgBackground = ''
        if (this.state.data.image) {
            imgBackground = new Buffer(this.state.data.image, 'base64').toString('binary')
        }
        return (
            <React.Fragment>
                <div className='header-container'>
                    <div className='header'>
                        <div className='header-left' onClick={() => this.props.history.goBack()}><i className="arrow-back fa fa-arrow-left"></i></div>
                        <div className='header-right'>
                            <div className='support'><i class="fa fa-question-circle"></i></div>
                            <div className='menu'><i class="fa fa-bars"></i></div>
                        </div>
                    </div>


                </div>

                <div className='specialty-container' style={{ backgroundImage: `url(${imgBackground})` }}>
                    <div className='mask'></div>
                    <div className='detail-specialty'
                        dangerouslySetInnerHTML={{ __html: `${this.state.data.contentHTML}` }}>
                    </div>
                </div>
                <div className='list-doctor'>
                    {arrDoctor && arrDoctor.length > 0 &&
                        arrDoctor.map((item, index) => {

                            return (<div className='doctor'>
                                <div className='infoDoctor'>
                                    <div className='avt'>
                                        <img className='img-cus' src={item.image} />
                                    </div>
                                    <div className='doctor-content'>
                                        <div className='title-doctor'>
                                            {item.firstName}
                                        </div>
                                        <div className='description'>
                                            {item.Markdown.description}
                                        </div>
                                    </div>
                                </div>

                                <div className='doctor-right'>
                                    <DoctorSchedule doctorId={item.id} />
                                    <DoctorClinic doctorId={item.id} />
                                </div>
                            </div>)
                        })


                    }

                </div>
                <hr></hr>
                <FooterHome />
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
