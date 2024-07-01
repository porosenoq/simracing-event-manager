import { del, get, post, put } from "../utils/request";


const endpoints = {
    events: 'http://localhost:3030/data/events/',
}

// TODO --> change user object

export async function getAll(){
    const result = await get(endpoints.events);
    // ако не хвърли exception 
    return result;
}

export async function getById(id) {
    const result = await get(endpoints.events + id);
    return result;
}

export async function create(data) {
    const result = await post(endpoints.events, data);
    return result;
}

export async function update(id, data) {
    const result = await put(endpoints.events + id, data);
    return result;
}

export async function deleteById(id) {
    const result = await del(id);
    return result;
}
