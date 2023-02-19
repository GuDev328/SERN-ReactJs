import React, { Component } from 'react';
import { connect } from "react-redux";
import { Redirect, Route, Switch } from 'react-router-dom';
import ManageSchedule from '../containers/Patient/Doctor/ManageSchedule'
import Home from '../routes/Home';
class System extends Component {
    render() {
        const { systemMenuPath } = this.props;

        return (
            <div className="system-container">
                <div className="system-list">
                    {this.props.userInfo && (this.props.userInfo.roleId === 'R2' || this.props.userInfo.roleId === 'R1') &&
                        <Switch>

                            <Route path="/doctor/manage-schedule" component={ManageSchedule} />


                            <Route component={ManageSchedule} />
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
