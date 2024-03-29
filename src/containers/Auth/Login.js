import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';
import { userService } from '../../services'
import ModalUser from '../System/ModalUser';

import { emitter } from '../../utils/emitter'
import HeaderHome from '../HomePage/HeaderHome'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpenModalUser: false,
            email: '',
            password: '',
            isShowPassword: false,
            errMessage: ''
        }
    }

    handleOnClickHandleRegister = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    toggleUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    createANewUser = async (dataUser) => {
        try {
            let response = await userService.createANewUser(dataUser)
            if (response && response.errCode != 0) {
                alert(response.message)
            }
            if (response && response.errCode == 0) {
                alert('Đăng kí thành công! Mời bạn đăng nhập')
                this.setState({
                    isOpenModalUser: false
                })
            }
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        } catch (error) {
            console.log(error)
        }

    }
    handleOnChangeEmailInput = (event) => {
        this.setState({
            email: event.target.value
        })
    }

    handleOnChangePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleOnClickLogin = async (event) => {
        this.setState({
            errMessage: '',
        })
        try {
            let data = await userService.handleLogin(this.state.email, this.state.password)

            //Case wrong password
            if (data && data.errCode != 0) {
                this.setState({
                    errMessage: data.message,
                })
            }

            //Case login success
            if (data && data.errCode == 0) {
                this.props.userLoginSuccess(data.user)
            }

        } catch (error) {
            //case error because not input parameter login
            if (error.response) {
                if (error.response.data) {
                    this.setState({
                        errMessage: error.response.data.message,
                    })
                }
            }
        }

    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }

    handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            this.handleOnClickLogin()
        }
    }

    render() {
        //JSX
        return (
            <div>
                <HeaderHome />
                <div className='login-background'>

                    <ModalUser
                        isHideRole={true}
                        isOpen={this.state.isOpenModalUser}
                        toggle={this.toggleUser}
                        createANewUser={this.createANewUser} />
                    <div className='login-container'>
                        <div className='login-content' onKeyPress={(event) => this.handleKeyPress(event)}>
                            <div className='col-12 text-center text-login' ><FormattedMessage id='login.login' /></div>
                            <div className='col-12 form-group'>
                                <label className='text-username'><FormattedMessage id='login.email' /></label>
                                <input className='form-control login-input'
                                    type='text'
                                    placeholder='Input Your Email'
                                    value={this.state.email}
                                    onChange={(event) => this.handleOnChangeEmailInput(event)}
                                />
                                <label className='text-password'><FormattedMessage id='login.password' /></label>
                                <div className='inputpassword'>
                                    <input className='form-control login-input'
                                        type={this.state.isShowPassword ? 'text' : 'password'}
                                        placeholder='Input Your password'
                                        value={this.state.password}
                                        onChange={(event) => this.handleOnChangePasswordInput(event)}
                                    />
                                    <div
                                        onClick={() => this.handleShowHidePassword()}
                                    ><i class={this.state.isShowPassword ? 'fas fa-eye-slash eye' : 'fas fa-eye eye'}></i></div>

                                </div>
                                <div className='col-12 errMessage'>{this.state.errMessage}</div>
                                <span className='forgot-password'><FormattedMessage id='login.forgotpassword' /></span>
                                <span className='register'
                                    onClick={this.handleOnClickHandleRegister}><FormattedMessage id='login.register' /></span>
                                <button className='btn-login'
                                    onClick={(event) => this.handleOnClickLogin(event)}
                                >Login</button>
                            </div>

                            <div className='text-center text-otherlogin'><FormattedMessage id='login.orlogin' /></div>

                            <div className='text-center mt-3'>
                                <i className="fab fa-google google-icon"></i>
                                <i className="fab fa-facebook facebook-icon"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = dispatch => {
    return {
        navigate: (path) => dispatch(push(path)),
        userLoginFail: () => dispatch(actions.userLoginFail()),
        userLoginSuccess: (userInfo) => dispatch(actions.userLoginSuccess(userInfo))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

