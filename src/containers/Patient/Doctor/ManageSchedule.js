import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import moment from "moment";
import Header from "../../Header/Header";
import { connect } from "react-redux";
import { userService } from "../../../services";
import { languages, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Select from "react-select";
import ModalShowDetailPatient from "./ModalShowDetailPatient";

class ManageSchedule extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedOption: null,
            arrDoctors: [],
            date: "",
            TimeArr: [],
            maxPatient: null,
            appoitment: [],
            isOpenShowDetailPatient: false,
            disChangeTime: false,
        };
    }

    async componentDidMount() {
        this.props.getDoctorsStart();
        this.props.getTimeStart();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.doctors !== this.props.doctors) {
            let listDoctors = this.arrDoctorToSelectOption(this.props.doctors);
            this.setState({
                arrDoctors: listDoctors,
            });
        }
        if (prevProps.language !== this.props.language) {
            let listDoctors = this.arrDoctorToSelectOption(this.props.doctors);
            this.setState({
                arrDoctors: listDoctors,
            });
        }
        if (prevProps.times !== this.props.times) {
            let data = this.props.times;
            if (data && data.length > 0) {
                data = data.map((item) => {
                    item.isSelected = false;
                    return item;
                });
                this.setState({
                    TimeArr: this.props.times,
                });
            }
        }
    }

    toggleShowDetailPatient = () => {
        this.setState({
            isOpenShowDetailPatient: !this.state.isOpenShowDetailPatient,
        });
    };
    toggleSendEmail = () => {
        this.setState({
            isOpenSendEmail: !this.state.isOpenSendEmail,
        });
    };
    arrDoctorToSelectOption = (arrDoctors) => {
        let options = [];
        let { language } = this.props;
        if (arrDoctors && arrDoctors.length > 0) {
            arrDoctors.map((item, index) => {
                let object = {};
                let labelVi = `${item.lastName} ${item.firstName}`;
                let labelEn = `${item.firstName} ${item.lastName}`;
                object.label = language == "vi" ? labelVi : labelEn;
                object.value = item.id;
                options.push(object);
            });
        }
        if (this.props.userInfo.roleId === "R2") {
            let doctor = options.find((item, index) => {
                return item.value == this.props.userInfo.id;
            });
            this.setState({
                selectedOption: doctor,
            });
        }
        return options;
    };

    resetTimeArr = () => {
        let TimeArr = this.state.TimeArr;
        if (TimeArr && TimeArr.length > 0) {
            TimeArr = TimeArr.map((item, index) => {
                item.isSelected = false;

                return item;
            });
        }
        this.setState({
            TimeArr: TimeArr,
        });
    };

    getSchedule = async () => {
        if (this.state.selectedOption && this.state.date) {
            let date = moment(this.state.date).format("YYYY-MM-DD");
            let dataTime = await userService.getSchedule(
                this.state.selectedOption.value,
                date
            );
            let dataAppoitment = await userService.getAppoitment(
                this.state.selectedOption.value,
                date
            );
            if (dataAppoitment.response.errCode === 0) {
                dataAppoitment = dataAppoitment.response.data;
            } else {
                dataAppoitment = [];
            }
            dataTime = dataTime.response.data;
            this.resetTimeArr();
            let updatedTimeArr = this.state.TimeArr.map((item1, index) => {
                dataTime.map((item2, index) => {
                    if (item1.keyMap === item2.timeType) {
                        item1.isSelected = true;
                    }
                });
                return item1;
            });
            let maxPatient = dataTime[0] ? dataTime[0].maxNumber : 0;
            this.setState({
                TimeArr: updatedTimeArr,
                maxPatient: maxPatient,
                appoitment: dataAppoitment,
            });
        }
    };

    handleChange = (selectedOption) => {
        this.setState({ selectedOption }, async () => {
            this.getSchedule();
        });
    };

    onChangeDate = (event) => {
        const currentDate = new Date();
        let chooseDate = new Date(event.target.value);
        if (chooseDate <= currentDate) {
            this.setState(
                {
                    date: event.target.value,
                    disChangeTime: true,
                },
                async () => {
                    this.getSchedule();
                }
            );
        } else {
            this.setState(
                {
                    date: event.target.value,
                    disChangeTime: false,
                },
                async () => {
                    this.getSchedule();
                }
            );
        }
    };

    handleOnClickBtnTiem = (time) => {
        let { TimeArr } = this.state;
        if (TimeArr && TimeArr.length > 0) {
            TimeArr = TimeArr.map((item, index) => {
                if (item.id === time.id) {
                    item.isSelected = !item.isSelected;
                }
                return item;
            });
        }
        this.setState({
            TimeArr: TimeArr,
        });
    };

    handleSaveTime = () => {
        if (
            !this.state.selectedOption ||
            !this.state.date ||
            !this.state.maxPatient
        ) {
            return alert("Missing input information!");
        }
        let chooseTime = this.state.TimeArr.filter((item, index) => {
            return item.isSelected === true;
        });
        let doctorId = this.state.selectedOption.value;
        let chooseDate = this.state.date;
        let maxPatient = this.state.maxPatient;
        let result = [];
        chooseTime.map((item, index) => {
            let timeType = item.keyMap.toString();
            let obj = {
                timeType: timeType,
                doctorId: doctorId,
                date: chooseDate,
                maxNumber: maxPatient,
            };
            result.push(obj);
        });
        userService.saveSchedule({ result });
        this.setState(
            {
                date: "",
                maxPatient: 0,
            },
            () => {
                let TimeArr = this.state.TimeArr;
                if (TimeArr && TimeArr.length > 0) {
                    TimeArr = TimeArr.map((item, index) => {
                        item.isSelected = false;

                        return item;
                    });
                }
                this.setState(
                    {
                        TimeArr: TimeArr,
                    },
                    () => {
                        if (this.props.userInfo.roleId !== "R2") {
                            this.setState({
                                selectedOption: null,
                            });
                        }
                    }
                );
            }
        );
    };
    handleOnChangeMaxPatient = (event) => {
        this.setState({
            maxPatient: event.target.value,
        });
    };
    handleOnClickShowDetailPatient = () => {
        this.setState({
            isOpenShowDetailPatient: true,
        });
    };
    handleOnClickSendEmail = () => {
        this.setState({
            isOpenSendEmail: true,
        });
    };
    handleDoneAppoitment = (item) => {
        let conf = window.confirm(
            "Xác nhận hoàn thành khám bệnh cho bệnh nhân này?"
        );
        if (conf) {
            let res = userService.doneAppointment({
                bookingId: item.id,
            });
            this.getSchedule();
        }
    };

    render() {
        let timeSchedule = this.state.TimeArr;
        const isDisabled = this.props.userInfo.roleId === "R2";
        return (
            <div>
                <Header />

                <div className="schedule-container">
                    <div className="title">Quản lý kế hoạch bác sĩ</div>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                Chọn bác sĩ
                                <Select
                                    value={this.state.selectedOption}
                                    onChange={this.handleChange}
                                    options={this.state.arrDoctors}
                                    isDisabled={isDisabled}
                                />
                            </div>
                            <div className="col-4">
                                Chọn ngày
                                <input
                                    type="date"
                                    value={this.state.date}
                                    onChange={(event) =>
                                        this.onChangeDate(event)
                                    }
                                    className="form-control"
                                />
                            </div>
                            <div className="col-2">
                                <label for="max-patient">
                                    Bệnh nhân tối đa:
                                </label>
                                <select
                                    id="max-patient"
                                    value={this.state.maxPatient}
                                    onChange={(value) =>
                                        this.handleOnChangeMaxPatient(value)
                                    }
                                    className="form-control"
                                >
                                    <option value={0}>--Choose--</option>
                                    <option value={1}>1</option>
                                    <option value={2}>2</option>
                                    <option value={3}>3</option>
                                    <option value={4}>4</option>
                                    <option value={5}>5</option>
                                </select>
                            </div>
                        </div>
                        <div className="time-container">
                            {timeSchedule &&
                                timeSchedule.length > 0 &&
                                timeSchedule.map((item, index) => {
                                    let isSelected = item.isSelected;
                                    return (
                                        <Button
                                            className="btn-time"
                                            key={index}
                                            style={
                                                isSelected
                                                    ? {
                                                          backgroundColor:
                                                              "#ffc107",
                                                      }
                                                    : {
                                                          backgroundColor:
                                                              "#69757d",
                                                      }
                                            }
                                            onClick={() =>
                                                this.handleOnClickBtnTiem(item)
                                            }
                                        >
                                            {this.props.language == languages.VI
                                                ? item.valueVi
                                                : item.valueEn}{" "}
                                        </Button>
                                    );
                                })}
                            <div
                                hidden={this.state.disChangeTime}
                                className="saveTime btn btn-primary"
                                onClick={() => this.handleSaveTime()}
                            >
                                Save Time
                            </div>
                        </div>
                    </div>
                    <table class="table table-bordered">
                        <thead>
                            <tr className="table-primary">
                                <th scope="col">STT</th>
                                <th scope="col">Họ Tên</th>
                                <th scope="col">Giới tính</th>
                                <th scope="col">Số điện thoại</th>
                                <th scope="col">Giờ hẹn</th>
                                <th scope="col">Trạng thái</th>
                                <th scope="col">Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.appoitment &&
                                this.state.appoitment.length > 0 &&
                                this.state.appoitment.map((item, index) => {
                                    if (item.statusId !== "S1")
                                        return (
                                            <tr>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.PatientInfo.name}</td>
                                                <td>
                                                    {
                                                        item.PatientInfo
                                                            .genderPatientData
                                                            .valueVi
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.PatientInfo
                                                            .phoneNumber
                                                    }
                                                </td>
                                                <td>
                                                    {
                                                        item.Schedule.timeData
                                                            .valueVi
                                                    }
                                                </td>
                                                <td>
                                                    {item.statusData.valueVi}
                                                </td>
                                                <td>
                                                    <div
                                                        onClick={
                                                            this
                                                                .handleOnClickShowDetailPatient
                                                        }
                                                        className="btn-action btn btn-primary"
                                                    >
                                                        Xem chi tiết
                                                    </div>
                                                    <ModalShowDetailPatient
                                                        isOpen={
                                                            this.state
                                                                .isOpenShowDetailPatient
                                                        }
                                                        toggle={
                                                            this
                                                                .toggleShowDetailPatient
                                                        }
                                                        data={item}
                                                    />
                                                    <div
                                                        className="btn-action btn btn-success"
                                                        onClick={() =>
                                                            this.handleDoneAppoitment(
                                                                item
                                                            )
                                                        }
                                                    >
                                                        Khám Xong!
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctors: state.admin.doctors,
        times: state.admin.times,
        userInfo: state.user.userInfo,
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getDoctorsStart: () => dispatch(actions.fetchAllDoctorsStart()),
        getTimeStart: () => dispatch(actions.fetchTimeStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
