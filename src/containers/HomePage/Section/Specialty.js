import React, { Component } from 'react';
import { connect } from 'react-redux';
import './Section.scss'
import { FormattedMessage } from 'react-intl'
import { userService } from '../../../services';
import { languages } from '../../../utils'
import { changeLanguageApp } from '../../../store/actions'
import Slider from "react-slick";
import { Link } from 'react-router-dom';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


class Specialty extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrSpecialty: []
        }
    }

    async componentDidMount() {
        let listSpecialty = await userService.getAllSpecialty()
        if (listSpecialty && listSpecialty.errCode === 0) {
            this.setState({
                arrSpecialty: listSpecialty.data
            })
        }
    }

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    handleOnClickSpecialty = (item) => {

    }

    render() {
        console.log(this.state.arrSpecialty)
        var settings = {
            dots: false,
            infinite: false,
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
                            {this.state.arrSpecialty && this.state.arrSpecialty.length > 0 &&
                                this.state.arrSpecialty.map((item, index) => {
                                    let imgBase64 = ''
                                    if (item.image) {
                                        imgBase64 = new Buffer(item.image, 'base64').toString('binary')
                                    }
                                    return <Link to={{ pathname: '/detail-specialty', state: { data: item } }}>
                                        <div className='div-section'>
                                            <div className='img-cus' style={{ backgroundImage: `url(${imgBase64})` }} ></div>
                                            <p className='img-title'>{item.name}</p>
                                        </div>
                                    </Link>

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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
