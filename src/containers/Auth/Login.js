import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import './Login.scss';
import { FormattedMessage } from 'react-intl';
import { divide } from 'lodash';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            isShowPassword: false,
        }
    }

    handleOnChangeUsernameInput = (event) => {
        this.setState({
            username: event.target.value
        })
    }

    handleOnChangePasswordInput = (event) => {
        this.setState({
            password: event.target.value
        })
    }

    handleOnClickLogin = (event) => {
        console.log(this.state)
    }
    handleShowHidePassword = () => {
        this.setState({
            isShowPassword: !this.state.isShowPassword
        })
    }
    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-center text-login' >Login</div>
                        <div className='col-12 form-group'>
                            <label className='text-username'>UserName</label>
                            <input className='form-control login-input'
                                type='text'
                                placeholder='Input Your Username'
                                value={this.state.username}
                                onChange={(event) => this.handleOnChangeUsernameInput(event)}
                            />
                            <label className='text-password'>PassWord</label>
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

                            <div className='forgot-password'>Forgot password?</div>
                            <button className='btn-login'
                                onClick={(event) => this.handleOnClickLogin(event)}
                            >Login</button>
                        </div>

                        <div className='text-center text-otherlogin'>Or Login With:</div>
                        <div className='text-center mt-3'>
                            <i className="fab fa-google google-icon"></i>
                            <i className="fab fa-facebook facebook-icon"></i>
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
        adminLoginSuccess: (adminInfo) => dispatch(actions.adminLoginSuccess(adminInfo)),
        adminLoginFail: () => dispatch(actions.adminLoginFail()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
