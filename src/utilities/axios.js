import axios from 'axios';
import Cookies from 'js-cookie';
import { BASE_URL } from '../constants';

const baseURL = BASE_URL;
const axiosInstance = axios.create({
    baseURL: baseURL,
    timeout: 5000,
    headers: {
        Authorization: Cookies.get('access_token')
            ? 'Bearer ' + Cookies.get('access_token')
            : null,
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => {
        return response;
    },
    async function (error) {
        if (typeof error.response === 'undefined') {
            alert(
                'A server/network error occurred. ' +
                'Looks like CORS might be the problem. ' +
                'Sorry about this - we will get it fixed shortly.'
            );
            return Promise.reject(error);
        }

        if (
            error.response.status === 401
        ) {
            Cookies.remove('access_token');
            return Promise.reject(error);
        }

        return Promise.reject(error);
    }
);

export default axiosInstance;
