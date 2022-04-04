import axios from "axios";
import {User} from "../constants";

// interface UserResponse {
//     user: User;
//     token: {
//         token_type: string;
//         expires_in: number;
//         access_token: string;
//         refresh_token: string;
//     }
// }

// class Auth {
//     protected auth;
//     constructor() {
//         this.auth = null;
//         localStorage.setItem('auth', null);
//     }
//
//     getUserData() {
//         this.auth = JSON.parse(localStorage.getItem('auth'));
//         return this.auth;
//     }
//
//     setUserData(data:UserResponse) {
//         this.auth = {...this.auth, data}
//         localStorage.setItem('auth', JSON.stringify(this.auth));
//         return this.auth;
//     }
//
//     getUserToken() : string | null {
//         if (!this.auth) {
//             this.getUserData();
//         }
//         try {
//             return this.auth.data?.token.access_token;
//         } catch (e) {
//             console.error(e);
//             return null;
//         }
//     }
//
//     getAuthorizationHeader () : string {
//         let token = this.getUserToken();
//         if (token) {
//             return `Bearer ${token}`;
//         } else {
//             return ''
//         }
//     }
// }

export class Service {
    baseUrl = "";

    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    getProfile() {
        // axios.defaults.headers.common['Authorization'] = this.getAuthorizationHeader();
        return axios.get(`${this.baseUrl}/profile`);
    }

    getAll(params: { page?: number } = {}) {
        // axios.defaults.headers.common['Authorization'] = this.getAuthorizationHeader();
        // console.log(this.getAuthorizationHeader())
        return axios.get(
            `${this.baseUrl}?${params["page"] ? `?page=${params["page"]}` : ""}`
        );
    }

    getById(id) {
        // axios.defaults.headers.common['Authorization'] = this.getAuthorizationHeader();
        return axios.get(`${this.baseUrl}/${id}`);
    }

    create(params) {
        // axios.defaults.headers.common['Authorization'] = this.getAuthorizationHeader();
        return axios.post(this.baseUrl, params);
    }

    update(id, params) {
        // axios.defaults.headers.common['Authorization'] = this.getAuthorizationHeader();
        return axios.put(`${this.baseUrl}/${id}`, params);
    }

    // prefixed with underscored because delete is a reserved word in javascript
    _delete(id) {
        // axios.defaults.headers.common['Authorization'] = this.getAuthorizationHeader();
        return axios.delete(`${this.baseUrl}/${id}`);
    }
}

export * from "./authService";

export const userService = new Service(`/users`);

export const bookService = new Service(`/books`);
export const materialService = new Service(`/materials`);
export const loanService = new Service(`/loans`);

export const roleService = new Service(`/roles`);
// export const permissionService = new Service(`/permission`);
