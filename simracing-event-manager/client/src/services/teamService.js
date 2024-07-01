import { del, get, post, put } from "../utils/request";


const endpoints = {
    teams: 'http://localhost:3030/data/teams/',
}

// TODO --> change user object

export async function getAll(){
    const result = await get(endpoints.teams);
    // ако не хвърли exception 
    return result;
}

export async function getById(id) {
    const result = await get(endpoints.teams + id);
    return result;
}

export async function create(data) {
    const result = await post(endpoints.teams, data);
    return result;
}

export async function update(id, data) {
    const result = await put(endpoints.teams + id, data);
    return result;
}

export async function deleteById(id) {
    const result = await del(endpoints.teams + id);
    return result;
}
