import axios from 'axios'

export const list = (data) => axios.post('/api/provider/list', data)

export const create = (data) => axios.post('/api/provider/create', data)

export const update = (data) => axios.post('/api/provider/update', data)