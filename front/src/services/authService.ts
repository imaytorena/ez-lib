import axios from "axios";

class Service {
    baseUrl = "/auth";

    register(params) {
        return axios.post(`${this.baseUrl}/register`, params);
    }
    
    login(params) {
        return axios.post(`${this.baseUrl}/login`, params);
    }
}

export const authService = new Service();