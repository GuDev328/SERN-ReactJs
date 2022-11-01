import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import Header from '../Header/Header';
import { connect } from 'react-redux';
class UserManageRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }


    render() {
        return (
            <div className='user-redux-container'>
                <Header />
                <div className='title'>Manager User With Redux</div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
