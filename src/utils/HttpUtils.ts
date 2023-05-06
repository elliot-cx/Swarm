/* eslint-disable @typescript-eslint/no-namespace */
export const API_URL = 'http://localhost:6969';
export namespace HttpUtils {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    export const fetchData = <T>(apiRoute: string, params?: { [key: string]: any }): Promise<T> => {
        return fetch(`${API_URL}/${apiRoute}`, params ? params : {})
            .then((response) => response.json());
    };
}