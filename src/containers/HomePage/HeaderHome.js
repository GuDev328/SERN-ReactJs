import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HeaderHome.scss'

class HeaderHome extends Component {

    render() {
        return (
            <div className='home-header-container'>
                <div className='home-header-content'>
                    <div className='left-content'>
                        <div className='menu-logo'>
                            <i class="menu fas fa-bars"></i>
                            <div className='logo'>
                                <img src='https://bookingcare.vn/assets/icon/bookingcare-2020.svg'></img>
                            </div>
                        </div>
                    </div>

                    <div className='center-content'>
                        <div className='child-content'>
                            <div className='title-child'>Chuyên khoa</div>
                            <div className='description-child'>Tìm bác sĩ theo chuyên khoa</div>
                        </div>
                        <div className='child-content'>
                            <div className='title-child'>Cơ sở y tế</div>
                            <div className='description-child'>Chọn bệnh viện phòng khám</div>
                        </div>
                        <div className='child-content'>
                            <div className='title-child'>Bác sĩ</div>
                            <div className='description-child'>Chọn bác sĩ giỏi</div>
                        </div>
                        <div className='child-content'>
                            <div className='title-child'>Gói khám</div>
                            <div className='description-child'>Khám sức khỏe tổng quát</div>
                        </div>
                    </div>

                    <div className='right-content'>
                        <i class="icon-help fas fa-question-circle"></i>
                        <div className='help'>Hỗ Trợ</div>
                    </div>
                </div>
            </div >
        );
    }

}

const mapStateToProps = state => {
    return {
        isLoggedIn: state.user.isLoggedIn
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HeaderHome);
