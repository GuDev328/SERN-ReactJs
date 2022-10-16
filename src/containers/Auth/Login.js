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
    }

    render() {
        //JSX
        return (
            <div className='login-background'>
                <div className='login-container'>
                    <div className='login-content'>
                        <div className='col-12 text-center text-login' >Login</div>
                        <form className='col-12 form-group'>
                            <label className='text-username'>UserName</label>
                            <input className='form-control login-input' type='text' placeholder='Input Your Username' />
                            <label className='text-password'>PassWord</label>
                            <input className='form-control login-input' type='password' placeholder='Input Your password' />
                            <div className='forgot-password'>Forgot password?</div>
                            <button className='btn-login'>Login</button>
                        </form>

                        <div className='text-center text-otherlogin'>Or Login With:</div>
                        <div className='text-center mt-3'>
                            <i class="fab fa-google google-icon"></i>
                            <i class="fab fa-facebook facebook-icon"></i>
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
