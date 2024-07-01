export function getUserData() {
    return JSON.parse(localStorage.getItem('user'));
}

export function saveUserData(data) {
    localStorage.setItem('user', JSON.stringify(data));
}

export function clearUserData() {
    localStorage.removeItem('user');
}