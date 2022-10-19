import { divide } from 'lodash';
import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import './UserManage.scss'
import { userService } from '../../services'
import ModalUser from './ModalUser';
class UserManage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            arrUsers: [],
            isOpenModalUser: false
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

    toggleUser = () => {
        this.setState({
            isOpenModalUser: !this.state.isOpenModalUser
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
            console.log(response)
        } catch (error) {
            console.log(error)
        }

    }

    render() {
        let arrUsers = this.state.arrUsers
        return (
            <div className='user-manage-container'>
                <ModalUser
                    isOpen={this.state.isOpenModalUser}
                    toggle={this.toggleUser}
                    createANewUser={this.createANewUser} />
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
                            <th>Address</th>
                            <th>Action</th>
                        </tr>
                        {
                            arrUsers && arrUsers.map((item, index) => {
                                return (
                                    <tr>
                                        <td>{item.email}</td>
                                        <td>{item.firstName}</td>
                                        <td>{item.lastName}</td>
                                        <td>{item.address}</td>
                                        <td>
                                            <button class="col-5 mx-2 btn btn-warning">Edit</button>
                                            <button class="col-5 mx-2 btn btn-danger">Delete</button>
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
