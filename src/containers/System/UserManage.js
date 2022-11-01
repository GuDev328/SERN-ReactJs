import { divide } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import Header from '../Header/Header';
import { userService } from '../../services'
import ModalUser from './ModalUser';
import ModalEditUser from './ModalEditUser';

import { emitter } from '../../utils/emitter'

class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false,
            isOpenModalEditUser: false,
            userEdit: {}
        }
    }

    async componentDidMount() {
        let response = await userService.getAllUser('ALL')
        if (response && response.errCode == 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    reGetAllUser = async () => {
        let response = await userService.getAllUser('ALL')
        if (response && response.errCode == 0) {
            this.setState({
                arrUsers: response.users,
            })
        }
    }

    handleOnClickHandleANewUser = () => {
        this.setState({
            isOpenModalUser: true
        })
    }
    handleOnClickEditUser = (user) => {
        this.setState({
            isOpenModalEditUser: true,
            userEdit: user
        })
    }

    toggleUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
        })
    }
    toggleEditUser = () => {
        this.setState({
            isOpenModalEditUser: !this.state.isOpenModalEditUser
        })
    }

    createANewUser = async (dataUser) => {
        try {
            let response = await userService.createANewUser(dataUser)
            if (response && response.errCode != 0) {
                alert(response.message)
            }
            if (response && response.errCode == 0) {
                await this.reGetAllUser()
                this.setState({
                    isOpenModalUser: false
                })
            }
            emitter.emit('EVENT_CLEAR_MODAL_DATA')
        } catch (error) {
            console.log(error)
        }

    }

    handleDeleteUser = async (user) => {
        try {
            let response = await userService.deleteUser(user)
            if (response && response.errCode == '0') {
                await this.reGetAllUser()
            } else {
                alert(response.message)
            }

        } catch (error) {
            console.log(error)
        }
    }

    handleEditUser = async (user) => {
        try {
            console.log(user)
            let response = await userService.editUser(user)
            if (response && response.errCode == '0') {
                await this.reGetAllUser()
                this.setState({
                    isOpenModalEditUser: false
                })
            } else {
                alert(response.message)
            }
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className='user-manage-container'>
                <Header />
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={this.toggleUser}
                    createANewUser={this.createANewUser} />
                {this.state.isOpenModalEditUser &&
                    <ModalEditUser
                        isOpen={this.state.isOpenModalEditUser}
                        toggle={this.toggleEditUser}
                        userDataEdit={this.state.userEdit}
                        editUser={this.handleEditUser}
                    />
                }
                <div className='title text-center mt-5 '> User Manage </div>
                <div>
                    <button className='btn btn-primary mx-5 px-3'
                        onClick={() => this.handleOnClickHandleANewUser()}
                    >Add new user</button>
                </div>
                <div className='table-user-manage mt-2 mx-5'>
                    <table className="customers">
                        <tr>
                            <th>Email</th>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Phonenumber</th>
                            <th>Role</th>
                            <th>Action</th>
                        </tr>
                        {
                            arrUsers && arrUsers.map((item, index) => {
                                let idUser = item.id
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.phoneNumber}</td>
                                        <td>{item.roleId}</td>
                                        <td>
                                            <button onClick={() => this.handleOnClickEditUser(item)} class="col-5 mx-2 btn btn-warning">Edit</button>
                                            <button onClick={() => this.handleDeleteUser(item)} class="col-5 mx-2 btn btn-danger">Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }

                    </table>
                </div>

            </div >
        );
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

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
