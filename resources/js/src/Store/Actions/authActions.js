import * as actionTypes from './actionsTypes';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error
    };
};

export const authSuccess = (
    token,
    userId,
    name,
    email

) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token,
        userId,
        email,
        name
    }
}

export const logoutStart = () => {
    return {
        type: actionTypes.LOGOUT_START
    }
};

export const logoutSuccess = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS
    }
};

export const logoutFail = () => {
    return {
        type: actionTypes.LOGOUT_FAIL
    }
};

export const auth = (user, password) => {
    return async dispatch => {
        dispatch(authStart());
        const autData = new FormData();
        autData.append('email', user);
        autData.append('password', password);
        await axios.post('/api/v1/login', autData)
            .then(response => {
                const user = response.data.data.user;
                const token = response.data.data.token;
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('userId', user.id);
                sessionStorage.setItem('userName', user.name);
                sessionStorage.setItem('email', user.email);
                dispatch(authSuccess(
                    token,
                    user.id,
                    user.name,
                    user.email
                ));
            }).catch(err => {
                dispatch(authFail(err.response.data.error));
            });
    }
};

export const logout = (token = null) =>  {
    return dispatch => {
        dispatch(logoutStart());
        if(token !== null) {
            axios.delete('/api/v1/logout', {
                headers: {
                    Authorization: "Bearer " + token
                }
            }).then(meResponse => {
                sessionStorage.clear();
                dispatch(logoutSuccess())
            }).catch(err => {
                sessionStorage.clear();
                dispatch(logoutSuccess())
            });
        } else {
            sessionStorage.clear();
            dispatch(logoutSuccess())
        }
    };
};

export const authCheckState = () => {
    return dispatch => {
        const token = sessionStorage.getItem('token');
        if (!token){
            dispatch(logout());
        } else {
            const userId = sessionStorage.getItem('userId');
            const userName = sessionStorage.getItem('userName');
            const email = sessionStorage.getItem('email');

            dispatch(authSuccess(
                token,
                userId,
                userName,
                email
            ));
        }
    }
};
