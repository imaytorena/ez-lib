import axios from 'axios';

export const userService = {
    getAll,
    getById,
    create,
    update,
    delete: _delete
};

const baseUrl = `/users`;

function getAll() {
    return axios.get(baseUrl);
}

function getById(id) {
    return axios.get(`${baseUrl}/${id}`);
}

function create(params) {
    return axios.post(baseUrl, params);
}

function update(id, params) {
    return axios.put(`${baseUrl}/${id}`, params);
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
    return axios.delete(`${baseUrl}/${id}`);
}
