import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });

export const register = (currentUser) => API.post('/api/v1/auth/register', currentUser)