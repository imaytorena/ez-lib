import axios from "axios";

class Service {
    baseUrl = "/auth";

    constructor() {
    }

    register(params) {

        // axios.defaults.baseURL = process.env.REACT_APP_BACKEND_URL ?? `http://easylibrary.test`;
        // axios.get('/oauth/clients')
        //     .then(response => {
        //         console.log(response.data);
        //     });
        // axios.defaults.baseURL = process.env.REACT_APP_API_URL ?? `http://easylibrary.test/api`;
        return axios.post(`${this.baseUrl}/register`, params);
    }
    
    login(params) {
        return axios.post(`${this.baseUrl}/login`, params);
    }
}

export const authService = new Service();