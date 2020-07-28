import axios from '../axios/axios';
import {setContacts} from './contactActions'

export const _login = (token, username, error) => {
    // action for setting log-in info in Redux store
    return{
        type:'LOGIN',
        login:{
            token,
            username,
            error
        }
    }
}
export const login = (username, password) => {
    return (dispatch) => {
        // makes call to API to log in user and
        // passes given username and password
        return axios.post('users/login/', {
            username: username,
            password: password
        }).then(result => {
            // if token is returned, token and username  
            // is stored in localStorage
            const token = result.data.token
            localStorage.setItem('jwt', token)
            const username = result.data.user.username
            localStorage.setItem('username', username)
            // passes boolean token-existence and username to '_login' action
            // and dispatches action for setting contacts in Redux store
            dispatch(_login(!!token, username, undefined));
            dispatch(setContacts());   
        }).catch((error) => {
            // catches error given from API call and 
            // sends it to '_login' action
            let err = error.response.data.message
            dispatch(_login(false, undefined, err));
        });
    };
};

export const _logout = (token, username, error) => {
    // action for removing log-in info from Redux store
    return{
        type:'LOGOUT',
        login:{
            token,
            username,
            error
        }
    }
}
export const logout = () => {
    return (dispatch) => {
        // removes token and username from localStorage and dispatches 
        // action for removing log-in info from Redux store
        localStorage.removeItem('jwt')
        localStorage.removeItem('username')
        dispatch(_logout(false, undefined, undefined));
    }
};

export const signup = (email, username, password) => {
    return (dispatch) => {
        // makes call to API to create user and
        // passes given email, username and password
        return axios.post('users/create/', {
            email: email,
            username: username,
            password: password
        }).then(result => {
            // if token is returned, token and username  
            // is stored in localStorage
            const token = result.data.token
            localStorage.setItem('jwt', token)
            const username = result.data.user.username
            localStorage.setItem('username', username)
            // passes boolean token-existence and username to '_login' action
            // and dispatches action for setting contacts in Redux store
            dispatch(_login(!!token, username, undefined));
            dispatch(setContacts());
        }).catch((error) => {
            // catches error given from API call and 
            // sends it to '_login' action
            let err = error.response.data.error[0]
            dispatch(_login(false, undefined, err));
        });;
    };
};