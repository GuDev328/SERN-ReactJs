import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DetailClinic.scss'
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
import HeaderHome from '../HomePage/HeaderHome'

class DetailClinic extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: this.props.location.state.data,
        }
    }

    async componentDidMount() {

    }

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    handleOnClickSpecialty = (item) => {

    }

    render() {
        let img, avt
        if (this.state.data.image) {
            img = new Buffer(this.state.data.image, 'base64').toString('binary')
        }
        if (this.state.data.avt) {
            avt = new Buffer(this.state.data.avt, 'base64').toString('binary')
        }

        return (
            <React.Fragment>
                <HeaderHome />

                <div className='intro-container'>
                    <img className='image' src={img} />
                    <div className='intro'>
                        <div className='box-avt'>
                            <img className='avt' src={avt} />
                        </div>
                        <div className='name-address'>
                            <div className='name'>{this.state.data.name}</div>
                            <div className='address'>{this.state.data.address}</div>
                        </div>

                        <div className='menu'>
                            <div className='child-menu'>Giới Thiệu</div>
                            <div className='child-menu'>Thế mạnh chuyên môn</div>
                            <div className='child-menu'>Trang thiết bị</div>
                            <div className='child-menu'>Vị trí</div>
                            <div className='child-menu'>Quy trình khám</div>
                            <div className='child-menu'>Giá khám</div>
                        </div>
                    </div>
                </div>
                <div className='detail-clinic'
                    dangerouslySetInnerHTML={{ __html: `${this.state.data.contentHTML}` }}>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
