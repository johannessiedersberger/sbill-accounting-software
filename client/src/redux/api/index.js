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
