import { del, get, patch, post, putAdmin } from "../utils/request";


const endpoints = {
    events: 'http://localhost:3030/data/events',
}

// TODO --> change user object
export async function getRecent() {
    const query = '?sortBy=_createdOn%20desc&offset=0&pageSize=4';
    const result = await get(endpoints.events + query);
    return result;
}

export async function getAll(){
    const result = await get(endpoints.events);
    // ако не хвърли exception 
    return result;
}

export async function getById(id) {
    const result = await get(endpoints.events + '/' + id);
    return result;
}

export async function create(data) {
    const result = await post(endpoints.events, data);
    return result;
}

export async function update(id, data) {
    const result = await putAdmin(endpoints.events + '/' + id, data);
    return result;
}

export async function subscribe(id, data) {
    const result = await patch(endpoints.events + '/' + id, data);
    return result;
}

export async function deleteById(id) {
    const result = await del(endpoints.events + '/' + id);
    return result;
}
