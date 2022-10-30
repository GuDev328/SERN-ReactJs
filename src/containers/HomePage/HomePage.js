import React, { Component } from 'react';
import { connect } from 'react-redux';

import HeaderHome from './HeaderHome';
import Specialty from './Section/Specialty'
import MedicalFacility from './Section/MedicalFacility'
import DoctorWeek from './Section/DoctorWeek';
import Handbook from './Section/Handbook';
import FooterHome from './FooterHome';
class HomePage extends Component {

    render() {
        return (
            <div>
                <HeaderHome />
                <Specialty />
                <MedicalFacility />
                <DoctorWeek />
                <Handbook />
                <FooterHome />
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
