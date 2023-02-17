import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'

class HomeBanner extends Component {

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    render() {
        return (
            <React.Fragment>
                <div className='home-banner-container'>
                    <div className='mask-black'></div>
                    <div className='mask-white'></div>
                    <div className='in-mark'>
                        <div className='title1'><FormattedMessage id="homebanner.title1" /></div>
                        <div className='title2'><FormattedMessage id="homebanner.title2" /></div>
                        <div className='search'>
                            <i class="icon-search fas fa-search"></i>
                            <input className='input-search' type='text' placeholder='Nhập Thông Tin Tìm Kiếm' />
                        </div>
                        <div className='download-app'>
                            <img className='img-down' src='https://bookingcare.vn/assets/icon/google-play-badge.svg' />
                            <img className='img-down' src='https://bookingcare.vn/assets/icon/app-store-badge-black.svg' />
                        </div>
                        <div className='list-option'>

                            <div className='option-child'>
                                <div className='khamchuyenkhoa option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child1" /></div>
                            </div>
                            <div className=' option-child'>
                                <div className=' khamtuxa option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child2" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='khamtongquat option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child3" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='dichvuxetnghiem option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child4" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='suckhoetinhthan option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child5" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='khamnhakhoa option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child6" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='goiphauthuat option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child7" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='sanphamyte option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child8" /></div>
                            </div>
                            <div className='option-child'>
                                <div className='suskhoedoanhnghiep option-icon'></div>
                                <div className='option-title'><FormattedMessage id="homebanner.child9" /></div>
                            </div>
                        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeBanner);
