import * as actionTypes from './actions';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        error: error
    };
};

export const auth = (login, password) => {
    return dispatch => {
        dispatch(authStart());
    };
};