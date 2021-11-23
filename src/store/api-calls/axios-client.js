import axios from 'axios';

const fetchClient = () => {
    const config = {
        baseURL: 'http://127.0.0.1:8000/',
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const instance = axios.create(config);

    instance.interceptors.request.use((config) => {
        const token = localStorage.getItem('serviceToken');
        instance.defaults.headers.common.Authorization = token ? `Token ${token}` : '';
        return config;
    });

    return instance;
};

export default fetchClient();

