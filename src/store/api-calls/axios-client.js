import axios from 'axios';

const fetchClient = () => {
    const config = {
        baseURL: `${process.env.REACT_APP_DJANGO_SERVER_API}/`,
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

