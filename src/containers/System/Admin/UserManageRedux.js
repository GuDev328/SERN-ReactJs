import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserManageRedux.scss'
import { FormattedMessage } from 'react-intl';
import Header from '../../Header/Header';
import { connect } from 'react-redux';
import { userService } from '../../../services'
import { languages } from '../../../utils';
import * as actions from '../../../store/actions'

class UserManageRedux extends Component {

    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            address: '',
            positionId: '',
            image: '',
            phoneNumber: '',
            gender: '',
            roleId: '',

            genderArr: [],
            positionArr: [],
            roleArr: [],
            avtPrev: '',
            isOpen: false
        }
    }

    async componentDidMount() {
        this.props.getGenderStart()
        this.props.getPositionStart()
        this.props.getRoleStart()
    }

    handleOnChangeInput = (event, id) => {
        let copyState = { ...this.state }
        copyState[id] = event.target.value
        this.setState({
            ...copyState
        })

    }
    checkValidateInput = () => {
        let isValid = true
        let arrInput = ['email', 'password', 'firstName', 'lastName', 'address', 'phoneNumber', 'positionId', 'gender', 'roleId']
        for (let i = 0; i < arrInput.length; i++) {
            if (!this.state[arrInput[i]]) {
                isValid = false
                alert("Missing parameter: " + arrInput[i])
                break
            }
        }
        return isValid
    }
    handleAddANewUser = () => {
        let isValid = this.checkValidateInput()
        if (isValid) {
            this.createANewUser(this.state)
        }
    }

    createANewUser = async (dataUser) => {
        try {
            let response = await userService.createANewUser(dataUser)
            if (response && response.errCode != 0) {
                alert(response.message)
            }
            if (response && response.errCode == 0) {
                this.setState({
                    email: '',
                    password: '',
                    firstName: '',
                    lastName: '',
                    address: '',
                    phoneNumber: '',
                    positionId: '',
                    image: '',
                    gender: '',
                    roleId: '',
                    avtPrev: '',
                    isOpen: false
                })
                alert('Create a new user sucsessfully!')
            }
        } catch (error) {
            console.log(error)
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                genderArr: this.props.genders
            })
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                positionArr: this.props.positions
            })
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                roleArr: this.props.roles
            })
        }
    }
    handleOnChangeImage = (event) => {
        let data = event.target.files
        let file = data[0]
        if (file) {
            let objectUrl = URL.createObjectURL(file)
            this.setState({
                avtPrev: objectUrl,
                image: file.name
            })
        }
    }
    openPreviewAvt = () => {
        if (!this.state.avtPrev) return;
        this.setState({
            isOpen: true
        })
    }
    render() {
        let genders = this.state.genderArr;
        let positions = this.state.positionArr;
        let roles = this.state.roleArr;
        console.log(this.state.image)
        return (
            <div className='user-redux-container'>
                <Header />
                <div className='title'>Manage User with redux</div>
                <div className="container">
                    <div className="row">
                        <div className="form-group col-6">
                            <label for="">Email</label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'email')} value={this.state.email} type="email" className="form-control" name="email" placeholder="Email" />
                        </div>
                        <div className="form-group col-6">
                            <label for=""><FormattedMessage id="user.password" /></label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'password')} value={this.state.password} type="password" className="form-control" name="password" placeholder="Password" />
                        </div>
                    </div>
                    <div className='row'>
                        <div className="form-group col-6">
                            <label for=""><FormattedMessage id="user.firstName" /></label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'firstName')} value={this.state.firstName} type="text" className="form-control" name="firstName" placeholder="First Name" />
                        </div>
                        <div className="form-group col-md-6">
                            <label for=""><FormattedMessage id="user.lastName" /></label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'lastName')} value={this.state.lastName} type="text" className="form-control" name="lastName" placeholder="Last Name" />
                        </div>
                    </div>

                    <label for=""><FormattedMessage id="user.address" /></label>
                    <input onChange={(event) => this.handleOnChangeInput(event, 'address')} value={this.state.address} type="text" className="form-control" name="address" placeholder="1234 Main St" />

                    <div className='row'>
                        <div className="form-group col-3">
                            <label for=""><FormattedMessage id="user.phoneNumber" /></label>
                            <input onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')} value={this.state.phoneNumber} type="text" className="form-control" name="phoneNumber" />
                        </div>
                        <div className="form-group col-1">
                            <label for=""><FormattedMessage id="user.gender" /></label>
                            <select onChange={(event) => this.handleOnChangeInput(event, 'gender')} value={this.state.gender} name="gender" className="form-control">
                                <option selected value="">-Choose-</option>
                                {genders && genders.length > 0 &&
                                    genders.map((item, index) => {
                                        return (<option value={item.key}>{this.props.language == languages.VI ? item.valueVi : item.valueEn}</option>)
                                    })
                                }


                            </select>
                        </div>
                        <div className="form-group col-2">
                            <label for=""><FormattedMessage id="user.positionId" /></label>
                            <select onChange={(event) => this.handleOnChangeInput(event, 'positionId')} value={this.state.positionId} name="positionId" className="form-control">
                                <option selected value="">-Choose-</option>
                                {positions && positions.length > 0 &&
                                    positions.map((item, index) => {
                                        return (<option value={item.key}>{this.props.language == languages.VI ? item.valueVi : item.valueEn}</option>)
                                    })
                                }

                            </select>
                        </div>

                        <div className="form-group col-2">
                            <label for=""><FormattedMessage id="user.roleId" /></label>
                            <select onChange={(event) => this.handleOnChangeInput(event, 'roleId')} value={this.state.roleId} name="roleId" className="form-control">
                                <option selected value="">-Choose-</option>
                                {roles && roles.length > 0 &&
                                    roles.map((item, index) => {
                                        return (<option value={item.key}>{this.props.language == languages.VI ? item.valueVi : item.valueEn}</option>)
                                    })
                                }

                            </select>
                        </div>
                        <div className="form-group col-4">
                            <label for=""><FormattedMessage id="user.image" /></label>
                            <div className='preview-avt-container'>
                                <input type='file' id='upload_avt' hidden onChange={(event) => this.handleOnChangeImage(event)} className="form-control" />
                                <label className='upload-avt' htmlFor='upload_avt'><i className="fas fa-upload"></i>Tải lên</label>
                                <div className='preview-avt'
                                    style={{ backgroundImage: `url(${this.state.avtPrev})` }}
                                    onClick={() => this.openPreviewAvt()}
                                ></div>
                            </div>


                        </div>

                    </div>
                    <Button className='mt-3 px-3' color="primary" onClick={() => this.handleAddANewUser()}>Add New</Button>{' '}
                </div>
                {this.state.isOpen === true &&
                    <Lightbox
                        mainSrc={this.state.avtPrev}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                }
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        positions: state.admin.positions,
        roles: state.admin.roles
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getGenderStart: () => dispatch(actions.fetchGenderStart()),
        getPositionStart: () => dispatch(actions.fetchPositionStart()),
        getRoleStart: () => dispatch(actions.fetchRoleStart())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManageRedux);
