import React, { Component } from 'react';
import './ModalConfirm.scss'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import logo from "../../../../src/assets/logo.svg"

class ModalAskLogin extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            phoneNumber: '',
            gender: '',
            roleId: '',
        }
    }


    componentDidMount() {

    }

    toggle = () => {
        this.props.toggle()
    }
    handelOnClickLogin = () => {
        this.props.history.push(`/login`)
    }
    render() {

        return (
            <Modal
                isOpen={this.props.isOpen}
                toggle={() => this.toggle()}
                size='md'
                className={'abc'}>
                {/* <ModalHeader toggle={() => this.toggle()}>Register a new user</ModalHeader> */}
                <ModalBody>
                    {this.props.errCode === 0 &&
                        <div>
                            <div className='logo'>
                                <img src={logo}></img>
                            </div>
                            <div className='icon2'><i class="fas fa-envelope"></i></div>
                            <h3 className='cofirm-title'>Chỉ còn 1 bước nữa thôi</h3>
                            <p>Bạn đăng kí thành công lịch hẹn này. Chúng tôi đã gửi email xác thực cho bạn.
                                Bạn hãy bấm vào liên kết trong email để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
                            </p>
                            <Button className='px-3' color="primary" ><a href='https://mail.google.com/mail/u/0/#inbox/'>Đi đến Gmail</a></Button>{' '}
                            <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </div>
                    }

                    {this.props.errCode === 2 &&
                        <div>
                            <div className='logo'>
                                <img src={logo}></img>
                            </div>
                            <div className='icon2'><i class="fas fa-envelope-open"></i></div>
                            <h3 className='cofirm-title'>Xác nhận qua email</h3>
                            <p>Bạn đã đăng kí lịch hẹn này. Chúng tôi đã gửi email xác thực cho bạn.
                                Bạn hãy bấm vào liên kết trong email để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh.
                            </p>

                            <Button className='px-3' color="primary" ><a href='https://mail.google.com/mail/u/0/#inbox/'>Đi đến Gmail</a></Button>{' '}
                            <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </div>
                    }

                    {this.props.errCode === 3 &&
                        <div>
                            <div className='logo'>
                                <img src={logo}></img>
                            </div>

                            <div className='icon3'><i class="fas fa-times-circle"></i></div>
                            <h3 className='cofirm-title'>Lịch hẹn này đã đầy chỗ</h3>
                            <p>Xin lỗi bạn vì sự bất tiện này. Số người đặt lịch khám này quá đông. Vui lòng chọn lịch hẹn khác.
                            </p>
                            <p className='note5'>Xin chân thành cảm ơn!</p>

                            <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </div>
                    }
                    {this.props.errCode === -1 &&
                        <div>
                            <div className='logo'>
                                <img src={logo}></img>
                            </div>

                            <div className='icon3'><i class="fas fa-times-circle"></i></div>
                            <h3 className='cofirm-title'>Lỗi</h3>
                            <p>Xin lỗi bạn vì sự bất tiện này. Server đang nâng cấp hoặc gặp sự cố. Bạn vui lòng thử lại sau.
                            </p>
                            <p className='note5'>Xin chân thành cảm ơn!</p>

                            <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </div>
                    }


                    {this.props.errCode === 5 &&
                        <div>
                            <div className='logo'>
                                <img src={logo}></img>
                            </div>

                            <div className='icon5'><i class="far fa-check-circle"></i></div>
                            <h3 className='cofirm-title'>Đặt lịch khám thành công</h3>
                            <p>Chúc mừng bạn đã đăng kí thành công lịch hẹn.Thông tin lịch hẹn chúng tôi đã gửi cho bạn qua gmail.
                            </p>
                            <p className='note5'>Xin chân thành cảm ơn!</p>

                            <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                        </div>
                    }

                </ModalBody>
                {/* <ModalFooter>
                    <Button className='px-3' color="primary" onClick={() => this.handleAddANewUser()}>Register</Button>{' '}
                    <Button className='px-3' color="secondary" onClick={() => this.toggle()}>Cancel</Button>
                </ModalFooter> */}
            </Modal >
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ModalAskLogin));
