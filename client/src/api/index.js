import axios from 'axios';


const API = axios.create({ baseURL: 'http://localhost:5000' });


// TODO: Register and Login dynamic endpoint
export const authUser = ({ currentUser, endPoint, alertText }) => API.post(`/api/v1/auth/${endPoint}`, currentUser, alertText);