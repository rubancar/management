import axios from 'axios'

import authConfig from '../config/auth'

export const authenticate = (credentials) => axios.post('/api/login', credentials)

export const logout = () => axios.post('/api/logout')

export const forgotPass = (data) => axios.post('/api/forgotpass', data)

export const recoverPass = (data) => axios.post('/api/recoverpass', data)

export const userInfo = () => axios.post('/api/me')

export const clearLocalStorage = () => localStorage.clear()