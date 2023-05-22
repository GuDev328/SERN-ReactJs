import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Home extends Component {

    render() {
        const { isLoggedIn } = this.props;
        let linkToRedirect = '/home';
        if (isLoggedIn && this.props.userInfo.roleId === 'R1') {
            linkToRedirect = '/system/user-manage'
        }
        if (isLoggedIn && this.props.userInfo.roleId === 'R2') {
            linkToRedirect = '/doctor/manage-schedule'
        }

        return (
            <Redirect to={linkToRedirect} />
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
