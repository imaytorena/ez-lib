import axios from "axios";

export class Service {
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getAll(params: { page?: number } = {}) {
        return axios.get(
            `${this.baseUrl}?${params["page"] ? `?page=${params["page"]}` : ""}`
        );
    }
    
    getById(id) {
        return axios.get(`${this.baseUrl}/${id}`);
    }
    
    create(params) {
        return axios.post(this.baseUrl, params);
    }
    
    update(id, params) {
        return axios.put(`${this.baseUrl}/${id}`, params);
    }
    
    // prefixed with underscored because delete is a reserved word in javascript
    _delete(id) {
        return axios.delete(`${this.baseUrl}/${id}`);
    }
}

export const userService = new Service(`/users`);

export const bookService = new Service(`/books`);
export const materialService = new Service(`/materials`);

export const roleService = new Service(`/roles`);
export const permissionService = new Service(`/permission`);