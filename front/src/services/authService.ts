import axios from "axios";

class Service {
    baseUrl = "/auth";

    register(params) {
        return axios.post(`/register`, params);
    }
    
    login(params) {
        return axios.post(`/login`, params);
    }
}

export const authService = new Service();