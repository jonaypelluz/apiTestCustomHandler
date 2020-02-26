import axios from "axios";

export const like = (id, type) => {
    return axios
        .post(
            process.env.REACT_APP_API_URL + "like",
            JSON.stringify({ id, type }),
            {
                headers: { "Content-Type": "application/json" },
            },
        )
        .then(response => {
            const data = response.data;
            if (data.message === "Error") {
                return Promise.reject(data.data);
            }
        })
        .catch(function(error) {
            return Promise.reject(error);
        });
};

export const unlike = id => {
    return axios
        .post(
            process.env.REACT_APP_API_URL + "unlike",
            JSON.stringify({ id }),
            {
                headers: { "Content-Type": "application/json" },
            },
        )
        .then(response => {
            const data = response.data;
            if (data.message === "Error") {
                return Promise.reject(data.data);
            }
        })
        .catch(function(error) {
            return Promise.reject(error);
        });
};

export const follow = id => {
    return axios
        .post(
            process.env.REACT_APP_API_URL + "follow",
            JSON.stringify({ id }),
            {
                headers: { "Content-Type": "application/json" },
            },
        )
        .then(response => {
            const data = response.data;
            if (data.message === "Error") {
                return Promise.reject(data.data);
            }
        })
        .catch(function(error) {
            return Promise.reject(error);
        });
};

export const unfollow = id => {
    return axios
        .post(
            process.env.REACT_APP_API_URL + "unfollow",
            JSON.stringify({ id }),
            {
                headers: { "Content-Type": "application/json" },
            },
        )
        .then(response => {
            const data = response.data;
            if (data.message === "Error") {
                return Promise.reject(data.data);
            }
        })
        .catch(function(error) {
            return Promise.reject(error);
        });
};
