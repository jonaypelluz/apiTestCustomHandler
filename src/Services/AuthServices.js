import axios from "axios";

export const login = (email, password) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL + "login",
            JSON.stringify({ email, password }),
            {
                headers: { "Content-Type": "application/json" },
            },
        )
        .then(response => {
            const data = response.data;
            if (data.message === "Error") {
                return Promise.reject(data.data);
            }
            saveUser(JSON.stringify(data.data));
            return data.data;
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const refresh = () => {
    let user = JSON.parse(getUser());
    return axios
        .post(
            process.env.REACT_APP_API_URL + "refresh-token",
            { refresh_token: user.refresh_token },
            {
                headers: { "Content-Type": "application/json" },
            },
        )
        .then(response => {
            const data = response.data;
            if (data.message === "Error") {
                return Promise.reject(data.data);
            }
            saveUser(JSON.stringify(data.data));
            return data.data;
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const register = user => {
    //TODO
};

export const getUser = () => {
    return sessionStorage.getItem("user");
};

const saveUser = user => {
    return sessionStorage.setItem("user", user);
};

export const logout = () => {
    return sessionStorage.clear();
};
