import * as actionTypes from '../Actions/actionsTypes';

const initalState = {
    token: null,
    userId: null,
    email: null,
    error: null,
    loading: false
}

const AuthReducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.AUTH_START:
            return {
                ...state,
                error: null,
                loading: true
            };
        case actionTypes.AUTH_SUCCESS:
            return {
                ...state,
                token: action.token,
                userId: action.userId,
                userName: action.name,
                email: action.email,
                error: null,
                loading: false
            };
        case actionTypes.LOGOUT_START:
            return {
                ...state,
                loading: true
            };
        case actionTypes.LOGOUT_SUCCESS:
            return {
                ...state,
                token: null,
                userId: null,
                userName: null,
                email: null,
                error: null,
                loading: false
            };
        case actionTypes.AUTH_FAIL:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
}
export default AuthReducer;
