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