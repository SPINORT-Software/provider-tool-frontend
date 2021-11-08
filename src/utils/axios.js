/**
 * axios setup to use mock service
 */

import axios from 'axios';

const axiosServices = axios.create({baseURL: 'http://127.0.0.1:8000'});

// interceptor for http
axiosServices.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log(error.response);
        return Promise.reject((error.response && error.response.data) || 'Wrong Services')
    }
);

export default axiosServices;
