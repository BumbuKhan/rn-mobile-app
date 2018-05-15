import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://185.69.154.235/api',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
});

export default instance;
