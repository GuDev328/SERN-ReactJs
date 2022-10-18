import axios from "../axios"


const userService = {
    handleLogin: (email, password) => {
        return axios.post('/api/login', { email: email, password: password })
    },
    getAllUser: (inputId) => {
        return axios.get(`/api/get-all-users?id=${inputId}`)
    }
};

export default userService;