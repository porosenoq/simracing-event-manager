import { clearUserData, getUserData } from "./util.js";

export async function request(method, url, data, isAdmin = false) {
    const options = {
        method,
        headers: {},

    };

    const userData = getUserData();

    if(isAdmin) {
        options.headers["X-Admin"] = true;
    }

    if(userData) {
        options.headers["X-Authorization"] = userData.accessToken;
    }

    if(data != undefined) {
        options.headers["Content-Type"] = "application/json";
        options.body = JSON.stringify(data);
    }

    try {
        const res = await fetch(url, options);

        if(!res.ok) {
            const err = await res.json();

            if(userData && err.code == 403) {
                //access token has expired
                clearUserData();
            }

            if(userData && err.code == 401) {
                throw new Error(err.message);
            }
            
            throw new Error(err.message);
        }

        if(res.status == 204) {
            return {};
        }

        return res.json();
    } catch(err) {
        console.log(err.message);
        throw err;
    }
}

export const get = (url) => request('get', url);
export const post = (url, data) => request('post', url, data);
export const put = (url, data) => request('put', url, data);
export const putAdmin = (url, data) => request('put', url, data, true);
export const patch = (url, data) => request('patch', url, data);
export const del = (url) => request('delete', url);