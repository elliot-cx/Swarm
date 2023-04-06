export const API_URL = 'http://localhost:8080'

const axios = require('axios');

export const fetchData = <T>(url:string): Promise<T> => {
    return fetch(url).then((res) => res.json());
}