import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderHome from './HeaderHome';

class HomePage extends Component {

    render() {
        return (
            <div>
                <HeaderHome />
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
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
