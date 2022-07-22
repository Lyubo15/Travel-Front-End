import axios from "../api/axios";

const REGISTER_URL = 'auth/signup';

const userService = {

    signup: (values) => {
        return axios.post(REGISTER_URL, JSON.stringify(values),
        {
            headers: { 'Content-Type': 'application/json' },
            withCredentials: true
        })
    }
};

export default userService