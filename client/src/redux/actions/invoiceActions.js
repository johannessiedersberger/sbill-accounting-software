import * as api from '../api/index';
import { AUTH, ADD_NEW } from './constants';
import UIkit from 'uikit';

export const uploadInvoice = (invoiceData) => async (dispatch) => {
    try {
        const response = await api.postInvoice(invoiceData);
        dispatch({ type: ADD_NEW, invoiceData });

        if (response.status === 200) {
            UIkit.notification({
                message: 'Invoice Upload Successfull',
                status: 'success',
                pos: 'top-right',
                timeout: 5000
            });
        }
    } catch (error) {
        UIkit.notification({
            message: 'Error during Invoice Upload: ' + error.response.data,
            status: 'warning',
            pos: 'top-right',
            timeout: 5000
        });
    }
}