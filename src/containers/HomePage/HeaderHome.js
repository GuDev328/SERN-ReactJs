import React, { Component } from "react";
import { connect } from "react-redux";
import "./HeaderHome.scss";
import { FormattedMessage } from "react-intl";
import { languages } from "../../utils";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { changeLanguageApp } from "../../store/actions";
import * as actions from "../../store/actions";
import logo from "../../../src/assets/logo.svg";

class HeaderHome extends Component {
    handleChangeLanguage = (lang) => {
        this.props.changeLanguageAppRedux(lang);
    };

    render() {
        return (
            <React.Fragment>
                <div className="home-header-container">
                    <div className="home-header-content">
                        <div className="left-content">
                            <div className="menu-logo">
                                <i class="menu fas fa-bars"></i>
                                <Link to={{ pathname: "/home" }}>
                                    <div className="logo">
                                        <img src={logo}></img>
                                    </div>
                                </Link>
                            </div>
                        </div>

                        <div className="center-content">
                            <div className="child-content">
                                <div className="title-child">
                                    <FormattedMessage id="homeheader.speciality" />
                                </div>
                                <div className="description-child">
                                    <FormattedMessage id="homeheader.search-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="title-child">
                                    <FormattedMessage id="homeheader.health-facility" />
                                </div>
                                <div className="description-child">
                                    <FormattedMessage id="homeheader.select-room" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="title-child">
                                    <FormattedMessage id="homeheader.doctor" />
                                </div>
                                <div className="description-child">
                                    <FormattedMessage id="homeheader.select-doctor" />
                                </div>
                            </div>
                            <div className="child-content">
                                <div className="title-child">
                                    <FormattedMessage id="homeheader.fee" />
                                </div>
                                <div className="description-child">
                                    <FormattedMessage id="homeheader.check-health" />
                                </div>
                            </div>
                        </div>

                        <div className="right-content">
                            <i class="icon-help fas fa-question-circle"></i>
                            <div className="help">
                                <FormattedMessage id="homeheader.support" />
                            </div>
                            <div className="language">
                                <div
                                    className={
                                        this.props.language === languages.VI
                                            ? "lang-vi action"
                                            : "lang-vi"
                                    }
                                >
                                    <span
                                        onClick={() =>
                                            this.handleChangeLanguage(
                                                languages.VI
                                            )
                                        }
                                    >
                                        VI
                                    </span>
                                </div>
                                <div
                                    className={
                                        this.props.language === languages.EN
                                            ? "lang-en action"
                                            : "lang-en"
                                    }
                                >
                                    <span
                                        onClick={() =>
                                            this.handleChangeLanguage(
                                                languages.EN
                                            )
                                        }
                                    >
                                        EN
                                    </span>
                                </div>
                            </div>
                            {this.props.isLoggedIn &&
                                this.props.userInfo.roleId === "R1" && (
                                    <div>
                                        <div
                                            className="btn btn-logout"
                                            onClick={this.props.processLogout}
                                            title="Logout"
                                        >
                                            <i className="fas fa-sign-out-alt"></i>
                                        </div>

                                        <div
                                            className="btn btn-logout"
                                            onClick={() =>
                                                this.props.history.push(
                                                    "/system/user-manage"
                                                )
                                            }
                                            title="Administrator"
                                        >
                                            <i className="fas fa-users-cog"></i>
                                        </div>
                                    </div>
                                )}
                            {this.props.isLoggedIn &&
                                this.props.userInfo.roleId === "R2" && (
                                    <div>
                                        <div
                                            className="btn btn-logout"
                                            onClick={this.props.processLogout}
                                            title="Logout"
                                        >
                                            <i className="fas fa-sign-out-alt"></i>
                                        </div>

                                        <div
                                            className="btn btn-logout"
                                            onClick={() =>
                                                this.props.history.push(
                                                    "/doctor/manage-schedule"
                                                )
                                            }
                                            title="Administrator"
                                        >
                                            <i className="fas fa-users-cog"></i>
                                        </div>
                                    </div>
                                )}

                            {this.props.isLoggedIn &&
                                this.props.userInfo.roleId === "R3" && (
                                    <div
                                        className="btn btn-logout"
                                        onClick={this.props.processLogout}
                                        title="Logout"
                                    >
                                        <i className="fas fa-sign-out-alt"></i>
                                    </div>
                                )}
                            {!this.props.isLoggedIn && (
                                <div
                                    className="btn btn-logout"
                                    onClick={() =>
                                        this.props.history.push("/login")
                                    }
                                    title="Login"
                                >
                                    <i
                                        className="fas fa-sign-in-alt"
                                        aria-hidden="true"
                                    ></i>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isLoggedIn: state.user.isLoggedIn,
        userInfo: state.user.userInfo,
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeLanguageAppRedux: (lang) => dispatch(changeLanguageApp(lang)),
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default withRouter(
    connect(mapStateToProps, mapDispatchToProps)(HeaderHome)
);
