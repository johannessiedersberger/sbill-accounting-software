import axios from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req: Request) => {
    if (localStorage.getItem('profile')) {
        req.headers.authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const signIn = (formData: any) => API.post('/api/users/signin', formData);
export const signUp = (formData: any) => API.post('/api/users/signup', formData);
export const verifyEmail = (uniqueString: string) => API.post(`/api/users/verify/${uniqueString}`);

export const postInvoice = (invoiceData: any) => API.post(`/api/invoices/`, invoiceData);
export const updateInvoice = (id: number, invoiceData: any) => API.put(`/api/invoices/id/${id}/`, invoiceData);
export const getAllInvoices = () => API.get('/api/invoices');
export const getInvoiceByInvoiceNumber = (id: number) => API.get(`/api/invoices/id/${id}`);
export const getNewInvoiceNumber = () => API.get('/api/invoices/number');
export const getPDFInvoice = (id: number) => API.get(`/api/invoices/pdf/${id}`);
