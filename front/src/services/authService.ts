import axios from "axios";

class Service {
    register(params) {
        return axios.post(`/auth/register`, params);
    }
    
    login(params) {
        return axios.post(`/auth/login`, params);
    }
}

export const authService = new Service();