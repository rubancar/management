import axios from 'axios'

import authConfig from '../config/auth'

export const authenticate = (credentials) => axios.post('/api/login', credentials)

export const logout = () => axios.post('/api/logout')

export const forgotPass = (data) => axios.post('/api/forgotpass', data)

export const recoverPass = (data) => axios.post('/api/recoverpass', data)

export const userInfo = () => axios.post('/api/me')

export const clearLocalStorage = () => localStorage.clear()

export const registerAuthHeaders = () => {

    // Set Auth token to all request if token is registed in local storage
    axios.interceptors.request.use((config) => {
        try {
            const token = localStorage.getItem("id_token")
            if (token)
                config.headers[authConfig.authHeaderKey] = authConfig.authHeaderValue(token) // format string this way `Bearer ${token}`
            else
                delete config.headers[authConfig.authHeaderKey];
        } catch (error) {
            // Storage cannot be read
        }
        return config;
    }, (error) => Promise.reject(error))

    // Intercept response checking erros for Authorization
    axios.interceptors.response.use((response) => response, (error) => {
        if (error.response.status === 401) {
           /* dispatch(setAuthFeedback(error.message || 'No autorizado', true))
            dispatch(doLogout())*/
        }
        return Promise.reject(error)
    })
}
