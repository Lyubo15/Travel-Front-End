import axios from 'axios';

export default axios.create({
    baseURL: process.env.NODE_ENV === "development" 
    ? 'http://localhost:3001/api/' 
    : 'http://54.159.20.135/api/' // in future use process.env.URL
});