import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData) => API.post('/api/users/signin', formData);
export const signUp = (formData) => API.post('/api/users/signup', formData);
export const verifyEmail = (uniqueString) => API.post(`/api/users/verify/${uniqueString}`);

export const postInvoice = (invoiceData) => API.post(`/api/invoices/`, invoiceData);
export const updateInvoice = (id, invoiceData) => API.put(`/api/invoices/id/${id}/`, invoiceData);
export const getAllInvoices = () => API.get('/api/invoices');
export const getInvoiceByInvoiceNumber = (id) => API.get(`/api/invoices/id/${id}`);
export const getNewInvoiceNumber = () => API.get('/api/invoices/number');
