import actionTypes from '../actions/actionTypes';

const initialState = {
    isLoadingGenders: false,
    genders: [],
    roles: [],
    positions: [],
    users: [],
    topDoctors: [],
    doctors: [],
    detailDoctor: {},
    times: [],
    prices: [],
    payments: [],
    provinces: []
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGenders = true
            return {
                ...state,
            }

        case actionTypes.FETCH_GENDER_SUCCESS:
            state.isLoadingGenders = false
            state.genders = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_GENDER_FAIL:
            state.isLoadingGenders = false
            return {
                ...state,
            }

        case actionTypes.FETCH_POSITION_SUCCESS:
            state.positions = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_POSITION_FAIL:
            state.positions = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ROLE_SUCCESS:
            state.roles = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ROLE_FAIL:
            state.roles = [];
            return {
                ...state,
            }

        case actionTypes.FETCH_ALL_USERS_SUCCESS:
            state.users = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_USERS_FAIL:
            state.users = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_SUCCESS:
            state.topDoctors = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_TOP_DOCTORS_FAIL:
            state.topDoctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_SUCCESS:
            state.doctors = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_ALL_DOCTORS_FAIL:
            state.doctors = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTORS_SUCCESS:
            state.detailDoctor = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_DETAIL_DOCTORS_FAIL:
            state.detailDoctor = {};
            return {
                ...state,
            }
        case actionTypes.FETCH_TIME_SUCCESS:
            state.times = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_TIME_FAIL:
            state.time = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_PRICE_SUCCESS:
            state.prices = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_PRICE_FAIL:
            state.prices = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_PAYMENT_SUCCESS:
            state.payments = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_PAYMENT_FAIL:
            state.payments = [];
            return {
                ...state,
            }
        case actionTypes.FETCH_PROVINCE_SUCCESS:
            state.provinces = action.data;
            return {
                ...state,
            }
        case actionTypes.FETCH_PROVINCE_FAIL:
            state.provinces = [];
            return {
                ...state,
            }
        default:
            return state;
    }
}

export default adminReducer;