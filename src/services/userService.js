import axios from "../axios"


const userService = {
    handleLogin: (email, password) => {
        return axios.post('/api/login', { email: email, password: password })
    },
    getAllUser: (inputId) => {
        return axios.get(`/api/get-all-users?id=${inputId}`)
    },
    createANewUser: (dataUser) => {
        return axios.post('/api/create-new-user', dataUser)
    },

    deleteUser: (user) => {
        return axios.delete('/api/delete-user', {
            data: {
                id: user.id
            }
        })
    },

    editUser: (user) => {
        return axios.put('/api/edit-user', user)
    },

    getAllCodeService: (inputType) => {
        return axios.get(`/api/allcode?type=${inputType}`)
    },

    getTopDoctor: (limit) => {
        return axios.get(`/api/get-top-doctor?limit=${limit}`)
    }
}
export default userService;