import * as api from '../api/index';
import { AUTH, CREATE_PROFILE } from './constants';
import UIkit from 'uikit';

export const signin = (formData, openSnackbar, setLoading) => async (dispatch) => {

    // try {
    //     //login the user
    //     const { data } = await api.signIn(formData)

    //     dispatch({ type: AUTH, data })
    //     // setLoading(false)
    //     openSnackbar("Signin successfull")
    //     // history.push('/dashboard')
    //     window.location.href = "/dashboard"

    // } catch (error) {
    //     // console.log(error?.response?.data?.message)
    //     openSnackbar(error?.response?.data?.message)
    //     setLoading(false)
    // }
}

export const signup = (formData) => async (dispatch) => {
    try {
        const response = await api.signUp(formData);
        console.log("response");
        console.log(response);
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


    const { data } = await api.verifyEmail(uniqueString);
    console.log(data);
    SetSuccessFullActivation(true);
    setHasLoaded(true);


}
