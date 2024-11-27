import axios from 'axios';
import { ref, watch } from 'vue';
import { useCookies } from 'vue3-cookies';
const { cookies } = useCookies();

const user_token = ref(cookies.get('accessToken') || '');

const baseURL = axios.create({
    baseURL: 'https://dist.nd.ru',
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user_token.value}`
    },
});

if (user_token.value) {
    baseURL.defaults.headers.common['Authorization'] = `Bearer ${user_token.value}`;
}

baseURL.interceptors.request.use(config => {
    if (user_token.value) {
        config.headers['Authorization'] = `Bearer ${user_token.value}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});


watch(() => user_token.value, (newToken) => {
    baseURL.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
});

baseURL.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            const formatted_error = formatErrorResponse(error.response);
            console.error(formatted_error);
            return Promise.reject(new Error(formatted_error.message));
        } else {
            const unknown_error = {
                message: "Ошибка, невозможно получить данные",
                statusCode: 500,
                error: "Internal Server Error",
            };
            console.error(unknown_error);
            return Promise.reject(new Error(unknown_error.message));
        }
    }
);

const formatErrorResponse = (response) => {
    const message = Array.isArray(response.data.message) && response.data.message.length === 1
        ? response.data.message[0]
        : Array.isArray(response.data.message)
            ? response.data.message.join('. ')
            : response.data.message;

    return {
        message: Array.isArray(message) ? JSON.stringify(message) : message,
        error: response.data.error,
        statusCode: response.data.statusCode,
    };
};

export const checkServerStatus = () => {
    return baseURL.head('/api/ping');
};

export const registerUser = async (user_data) => {
    const response = await baseURL.post('/api/reg', user_data);
    return response.data;
};

export const authUser = async (user_data) => {
    const response = await baseURL.post('/api/auth', user_data);
    cookies.set('accessToken', response.data.accessToken, '7d');
    user_token.value = response.data.accessToken;
    baseURL.defaults.headers.common['Authorization'] = `Bearer ${response.data.accessToken}`;
    return response.data;
};

export const getUserInfo = async () => {
    const response = await baseURL.get('/api/auth');
    return response.data;
};

export const logoutUser = async () => {
    const response = await baseURL.delete('/api/auth');
    cookies.remove('accessToken');
    user_token.value = '';
    return response.data;
};

export const createNote = async (title, content) => {
    const response = await baseURL.post('/api/notes', { title, content });
    return response.data;
};

export const getNotes = async () => {
    const response = await baseURL.get('/api/notes');
    return response.data;
};

export const deleteNote = async (id) => {
    const response = await baseURL.delete(`/api/notes/${id}`);
    return response.data;
};