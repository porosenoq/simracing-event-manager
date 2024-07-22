import { del, get, post, put, putAdmin } from "../utils/request";


const endpoints = {
    teams: `${import.meta.env.VITE_BASE_URL}/data/teams/`,
}

// TODO --> change user object

export async function getAll(){
    const result = await get(endpoints.teams);
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

export async function getTeamMembers(id) {
    const result = await get(endpoints.teams + id);
    const members = result.members;
    return members;
}

export async function getTeamApplicants(id) {
    const result = await get(endpoints.teams + id);
    const applicants = result.applicants;
    return applicants;
}

export async function teamApply(teamId, applicantId) {
    const oldData = await getById(teamId);
    const oldApplicants = oldData.applicants;
    const data = {...oldData, applicants: [...oldApplicants, {_id: applicantId}]};
    const result = await putAdmin(endpoints.teams + teamId, data);
    return result;
}