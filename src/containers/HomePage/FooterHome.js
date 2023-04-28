import React, { Component } from 'react';
import { connect } from 'react-redux';
import './FooterHome.scss'
import { FormattedMessage } from 'react-intl'
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import logo from "../../../src/assets/logo.svg"

import cn from "../../../src/assets/bo-cong-thuong.svg"

class FooterHome extends Component {

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }

    render() {
        return (
            <React.Fragment>
                <div className='footer-container'>
                    <div className='footer-content'>
                        <div className='colum1'>
                            <div className='logo'>
                                <img src={logo}></img>
                            </div>
                            <div className='title-cl1'><FormattedMessage id="homefooter.companyName" /></div>
                            <div> <i class="fas fa-map-marker-alt"></i> 28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>
                            <div><i class="fas fa-check"></i> ĐKKD số: 0106790291. Sở KHĐT Hà Nội cấp ngày 16/03/2015</div>
                            <div>
                                <img className='bct' src={cn}></img>
                                <img className='bct' src={cn}></img>
                            </div>
                        </div>
                        <div className='colum2'>
                            <div className='ul-li'><FormattedMessage id="homefooter.Contact-for-cooperation" /></div>
                            <div className='ul-li'><FormattedMessage id="homefooter.Enterprise-digital-transformation-package" /></div>
                            <div className='ul-li'><FormattedMessage id="homefooter.Recruit" /></div>
                            <div className='ul-li'><FormattedMessage id="homefooter.Frequently-asked-questions" /></div>
                            <div className='ul-li'><FormattedMessage id="homefooter.terms-of-use" /></div>
                            <div className='ul-li'><FormattedMessage id="homefooter.Privacy-Policy" /></div>
                            <div className='ul-li'><FormattedMessage id="homefooter.Complaint-handling-support-process" /></div>
                            <div className='ul-li'><FormattedMessage id="homefooter.Operational-Regulations" /></div>
                        </div>
                        <div className='colum3'>
                            <div className='title-cl3'><FormattedMessage id="homefooter.Headquarters" /></div>
                            <div className='descpt'>28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội</div>

                            <div className='title-cl3'><FormattedMessage id="homefooter.Office" /></div>
                            <div className='descpt'>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</div>

                            <div className='title-cl3'><FormattedMessage id="homefooter.support" /></div>
                            <div className='descpt'>support@bookingcare.vn (7h30 - 18h)</div>
                        </div>
                    </div>
                    <div className='download'>
                        <i class="fas fa-mobile-alt"></i> <FormattedMessage id="homefooter.download" /> <span className='linkdown'>Android</span>- <span className='linkdown'>iPhone/iPad</span>- <span className='linkdown'><FormattedMessage id="homefooter.other" /></span>
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

export default connect(mapStateToProps, mapDispatchToProps)(FooterHome);
