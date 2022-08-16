import * as api from '../api/index';
import { AUTH, CREATE_PROFILE } from './constants';
import UIkit from 'uikit';

export const signin = (formData) => async (dispatch) => {

    try {
        //login the user
        const response = await api.signIn(formData)
        const data = response.data;

        if (response.status === 200) {
            dispatch({ type: AUTH, data });
            window.location.href = "/dashboard"
        }


    } catch (error) {
        UIkit.notification({
            message: 'Error during Login: ' + error.response.data,
            status: 'warning',
            pos: 'top-right',
            timeout: 5000
        });
    }
}

export const signup = (formData) => async (dispatch) => {
    try {
        const response = await api.signUp(formData);
        if (response.status === 200) {
            window.location.href = "/check-email";
        }
    } catch (err) {

        UIkit.notification({
            message: 'Error during registration: ' + err.response.data,
            status: 'warning',
            pos: 'top-right',
            timeout: 5000
        });
    }
}


export const activeAccount = (uniqueString, setHasLoaded, SetSuccessFullActivation) => async (dispatch) => {

    try {
        const response = await api.verifyEmail(uniqueString);
        if (response.status === 200) {
            SetSuccessFullActivation(true);
            setHasLoaded(true);
        }
    } catch (error) {
        UIkit.notification({
            message: 'Error during Account activation: ' + error.response.data,
            status: 'warning',
            pos: 'top-right',
            timeout: 5000
        });
        setHasLoaded(true);
    }

}
