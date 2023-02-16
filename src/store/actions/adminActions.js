import actionTypes from './actionTypes';
import { userService } from '../../services'

// export const fetchGenderStart = () => ({
//     type: actionTypes.FETCH_GENDER_START
// });

export const fetchGenderStart = () => {
    return async (dispatch, getState) => {
        try {
            dispatch({ type: actionTypes.FETCH_GENDER_START })

            let res = await userService.getAllCodeService("Gender");
            if (res && res.errCode === 0) {
                dispatch(fetchGenderSuccess(res.data));
            } else {
                dispatch(fetchGenderFail());
            }
        } catch (error) {
            dispatch(fetchGenderFail());
            console.log("fetchGenderStart" + error)
        }
    }
};

export const fetchGenderSuccess = (genderData) => ({
    type: actionTypes.FETCH_GENDER_SUCCESS,
    data: genderData
});

export const fetchGenderFail = () => ({
    type: actionTypes.FETCH_GENDER_FAIL
});

export const fetchPositionStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService("Position");
            if (res && res.errCode === 0) {
                dispatch(fetchPositionSuccess(res.data));
            } else {
                dispatch(fetchPositionFail());
            }
        } catch (error) {
            dispatch(fetchPositionFail());
            console.log("fetchPositionStart" + error)
        }
    }
};

export const fetchPositionSuccess = (dataPosition) => ({
    type: actionTypes.FETCH_POSITION_SUCCESS,
    data: dataPosition
});

export const fetchPositionFail = () => ({
    type: actionTypes.FETCH_POSITION_FAIL
});

export const fetchRoleStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllCodeService("Role");
            if (res && res.errCode === 0) {
                dispatch(fetchRoleSuccess(res.data));
            } else {
                dispatch(fetchRoleFail());
            }
        } catch (error) {
            dispatch(fetchRoleFail());
            console.log("fetchRoleStart" + error)
        }
    }
};

export const fetchRoleSuccess = (dataRole) => ({
    type: actionTypes.FETCH_ROLE_SUCCESS,
    data: dataRole
});

export const fetchRoleFail = () => ({
    type: actionTypes.FETCH_ROLE_FAIL
});


export const fetchAllUsersStart = () => {
    return async (dispatch, getState) => {
        try {
            let res = await userService.getAllUser("ALL");
            if (res && res.errCode === 0) {
                dispatch(fetchAllUsersSuccess(res.users));
            } else {
                dispatch(fetchAllUsersFail());
            }
        } catch (error) {
            dispatch(fetchAllUsersFail());
            console.log("fetchAllUsersStart" + error)
        }
    }
};

export const fetchAllUsersSuccess = (dataUsers) => ({
    type: actionTypes.FETCH_ALL_USERS_SUCCESS,
    data: dataUsers
});

export const fetchAllUsersFail = () => ({
    type: actionTypes.FETCH_ALL_USERS_FAIL
});


export const fetchTopDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let resTopDoctor = await userService.getTopDoctor(10)
            resTopDoctor = resTopDoctor.topDoctors
            if (resTopDoctor && resTopDoctor.errCode === 0) {
                dispatch(fetchTopDoctorsSuccess(resTopDoctor.data));
            } else {
                dispatch(fetchTopDoctorsFail());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFail());
            console.log("fetchTopDoctorsStart" + error)
        }
    }
};

export const fetchTopDoctorsSuccess = (datatopDoctors) => ({
    type: actionTypes.FETCH_TOP_DOCTORS_SUCCESS,
    data: datatopDoctors
});

export const fetchTopDoctorsFail = () => ({
    type: actionTypes.FETCH_TOP_DOCTORS_FAIL
});

export const fetchAllDoctorsStart = () => {
    return async (dispatch, getState) => {
        try {
            let resDoctor = await userService.getDoctors('ALL')
            if (resDoctor && resDoctor.errCode === 0) {
                resDoctor = resDoctor.data
                dispatch(fetchAllDoctorsSuccess(resDoctor));
            } else {
                dispatch(fetchAllDoctorsFail());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFail());
            console.log("fetchAllDoctorsStart" + error)
        }
    }
};

export const fetchAllDoctorsSuccess = (dataDoctors) => ({
    type: actionTypes.FETCH_ALL_DOCTORS_SUCCESS,
    data: dataDoctors
});

export const fetchAllDoctorsFail = () => ({
    type: actionTypes.FETCH_ALL_DOCTORS_FAIL
});


export const saveInfoDoctorStart = (data) => {
    return async (dispatch, getState) => {
        try {
            console.log(data)
            let res = await userService.saveInfoDoctor(data)
            if (res && res.errCode === 0) {
                dispatch(saveInfoDoctorSuccess());
            } else {
                dispatch(saveInfoDoctorFail());
                console.log(res)
            }
        } catch (error) {
            dispatch(saveInfoDoctorFail());
            console.log("saveInfoDoctorStart" + error)
        }
    }
};

export const saveInfoDoctorSuccess = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_SUCCESS,
});

export const saveInfoDoctorFail = () => ({
    type: actionTypes.SAVE_INFO_DOCTOR_FAIL
});

export const fetchDetailDoctorsStart = (doctorId) => {
    return async (dispatch, getState) => {
        try {
            let resDoctor = await userService.getDetailDoctor(doctorId)
            if (resDoctor && resDoctor.errCode === 0) {
                resDoctor = resDoctor.data
                dispatch(fetchDetailDoctorsSuccess(resDoctor));
            } else {
                dispatch(fetchDetailDoctorsFail());
            }
        } catch (error) {
            dispatch(fetchTopDoctorsFail());
            console.log("fetchDetailDoctorsStart" + error)
        }
    }
};

export const fetchDetailDoctorsSuccess = (dataDoctors) => ({
    type: actionTypes.FETCH_DETAIL_DOCTORS_SUCCESS,
    data: dataDoctors
});

export const fetchDetailDoctorsFail = () => ({
    type: actionTypes.FETCH_DETAIL_DOCTORS_FAIL
});

export const fetchTimeStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await userService.getAllCodeService("Time");
            if (res && res.errCode === 0) {
                dispatch(fetchTimeSuccess(res.data));
            } else {
                dispatch(fetchTimeFail());
            }
        } catch (error) {
            dispatch(fetchTimeFail());
            console.log("fetchTimeStart" + error)
        }
    }
};

export const fetchTimeSuccess = (timeData) => ({
    type: actionTypes.FETCH_TIME_SUCCESS,
    data: timeData
});

export const fetchTimeFail = () => ({
    type: actionTypes.FETCH_TIME_FAIL
});

export const fetchPriceStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await userService.getAllCodeService("Price");
            if (res && res.errCode === 0) {
                dispatch(fetchPriceSuccess(res.data));
            } else {
                dispatch(fetchPriceFail());
            }
        } catch (error) {
            dispatch(fetchPriceFail());
            console.log("fetchPriceStart" + error)
        }
    }
};

export const fetchPriceSuccess = (priceData) => ({
    type: actionTypes.FETCH_PRICE_SUCCESS,
    data: priceData
});

export const fetchPriceFail = () => ({
    type: actionTypes.FETCH_PRICE_FAIL
});

export const fetchPaymentStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await userService.getAllCodeService("Payment");
            if (res && res.errCode === 0) {
                dispatch(fetchPaymentSuccess(res.data));
            } else {
                dispatch(fetchPaymentFail());
            }
        } catch (error) {
            dispatch(fetchPaymentFail());
            console.log("fetchPaymentStart" + error)
        }
    }
};

export const fetchPaymentSuccess = (paymentData) => ({
    type: actionTypes.FETCH_PAYMENT_SUCCESS,
    data: paymentData
});

export const fetchPaymentFail = () => ({
    type: actionTypes.FETCH_PAYMENT_FAIL
});

export const fetchProvinceStart = () => {
    return async (dispatch, getState) => {
        try {

            let res = await userService.getAllCodeService("Province");
            if (res && res.errCode === 0) {
                dispatch(fetchProvinceSuccess(res.data));
            } else {
                dispatch(fetchProvinceFail());
            }
        } catch (error) {
            dispatch(fetchProvinceFail());
            console.log("fetchProvinceStart" + error)
        }
    }
};

export const fetchProvinceSuccess = (provinceData) => ({
    type: actionTypes.FETCH_PROVINCE_SUCCESS,
    data: provinceData
});

export const fetchProvinceFail = () => ({
    type: actionTypes.FETCH_PROVINCE_FAIL
});