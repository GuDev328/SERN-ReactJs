import React, { Component } from 'react';
import { connect } from 'react-redux';

import * as actions from "../../store/actions";
import { languages } from '../../utils'
import { changeLanguageApp } from '../../store/actions'
import Navigator from '../../components/Navigator';
import { adminMenu } from './menuApp';
import './Header.scss';

class Header extends Component {

    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang)
    }
    render() {
        const { processLogout } = this.props;

        return (
            <div className="header-container">
                {/* thanh navigator */}
                <div className="header-tabs-container">
                    <Navigator menus={adminMenu} />
                </div>

                <div className='right'>
                    <div className='language'>
                        <div className={this.props.language === languages.VI ? 'lang-vi action' : 'lang-vi'} ><span onClick={() => this.handleChangeLanguage(languages.VI)}>VI</span></div>
                        <div className={this.props.language === languages.EN ? 'lang-en action' : 'lang-en'}><span onClick={() => this.handleChangeLanguage(languages.EN)}>EN</span></div>
                    </div>

                    {/* nút logout */}
                    <div className="btn btn-logout" onClick={processLogout} title="Logout">
                        <i className="fas fa-sign-out-alt"></i>
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
    };
};

const mapDispatchToProps = dispatch => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
