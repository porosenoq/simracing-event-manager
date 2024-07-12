import { get, post } from "../utils/request";


const endpoints = {
    login: `${import.meta.env.VITE_BASE_URL}/users/login`,
    register: `${import.meta.env.VITE_BASE_URL}/users/register`,
    logout: `${import.meta.env.VITE_BASE_URL}/users/logout`,
}

// TODO --> change user object

export async function login(email, password){
    const result = await post(endpoints.login, {email, password});
    // ако не хвърли exception 
    return result;
}

export async function register(email, password){
    const result = await post(endpoints.register, {email, password});
    return result;
}

export async function logout(){
    get(endpoints.logout);
}