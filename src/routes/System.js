import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import UserManage from '../containers/System/UserManage';
import UserManageRedux from '../containers/System/Admin/UserManageRedux';
import DoctorManage from '../containers/System/Admin/DoctorManage';
import Home from '../routes/Home';
import SpecialtyManage from '../containers/System/Admin/SpecialtyManage'
class System extends Component {
    render() {
        const { systemMenuPath } = this.props;
        return (
            <div className="system-container">
                <div className="system-list">
                    {this.props.userInfo && this.props.userInfo.roleId === 'R1' &&
                        <Switch>
                            <Route path="/system/user-manage" component={UserManage} />
                            <Route path="/system/user-manage-redux" component={UserManageRedux} />
                            <Route path="/system/doctor-manage" component={DoctorManage} />
                            <Route path="/system/manage-specialty" component={SpecialtyManage} />
                            <Route component={() => { return (<Redirect to={systemMenuPath} />) }} />
                        </Switch>
                    }
                    {this.props.userInfo && this.props.userInfo.roleId === 'R3' &&

                        <Route exact component={(Home)} />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        systemMenuPath: state.app.systemMenuPath,
        userInfo: state.user.userInfo
    };
};

const mapDispatchToProps = dispatch => {
    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
