import { get, post } from "../utils/request";


const endpoints = {
    login: 'http://localhost:3030/users/login',
    register: 'http://localhost:3030/users/register',
    logout: 'http://localhost:3030/users/logout',
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