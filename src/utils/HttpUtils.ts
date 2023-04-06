export const API_URL = 'http://localhost:6969'

const axios = require('axios');
export namespace HttpUtils {   
    export const fetchData = <T>(url:string): Promise<T> => {
        return fetch(url).then((res) => res.json());
    }

}