import axios, { AxiosRequestHeaders } from "axios";

const API = axios.create({ baseURL: 'http://localhost:5000' });

API.interceptors.request.use((req: any) => {

    if (localStorage.getItem('user')) {
        const baerer = `Bearer ${JSON.parse(localStorage.getItem('user') || '{}')?.state?.user?.token}`;
        req.headers.authorization = baerer;
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
export const getPDFInvoice = (id: number) => API.get(`/api/invoices/pdf/${id}`, { responseType: "blob" });
export const deleteInvoice = (id: number) => API.delete(`/api/invoices/id/${id}`);

export const getAllCustomers = () => API.get('/api/customers/');
export const createCustomer = (formData: any) => API.post('/api/customers', formData);
export const updateCustomer = (id: number, customerData: any) => API.put(`/api/customers/${id}`, customerData);
export const deleteCustomer = (id: number) => API.delete(`/api/customers/delete/${id}`);

export const getCompany = () => API.get('/api/company');
export const setCompany = (companyData: any) => API.post('/api/company', companyData);


export const getAllReceipts = () => API.get('/api/receipts/');
export const getReceipt = (id: string) => API.get(`/api/receipts/id/${id}`);

export const postReceiptFile = (formData: any, id: string) => API.post(`/api/receipts/file/${id}`, formData);
export const postReceipt = (data: any) => API.post('/api/receipts/data', data);
export const getReceiptFileSignedUrl = (fileName: string) => API.get(`/api/receipts/file/${fileName}`);

export const deleteFileFromReceipt = (fileName: string) => API.delete(`/api/receipts/file/delete/${fileName}`);
export const updateReceipt = (id: string, receiptData: any) => API.put(`/api/receipts/id/${id}`, receiptData);
export const deleteReceipt = (id: any) => API.delete(`/api/receipts/id/${id}`);
