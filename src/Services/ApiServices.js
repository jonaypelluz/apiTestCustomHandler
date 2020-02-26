import axios from "axios";

export const items = (query, type) => {
    let getParams = query !== "" && query !== null ? "?" + query : "";
    return axios
        .get(process.env.REACT_APP_API_URL + type + "/" + getParams, {
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
            const data = response.data;
            return data.info ? data : null;
        })
        .catch(error => {
            return null;
        });
};

export const item = (type, id) => {
    return axios
        .get(process.env.REACT_APP_API_URL + type + "/" + id, {
            headers: { "Content-Type": "application/json" },
        })
        .then(response => {
            const data = response.data;
            return data.id ? data : null;
        })
        .catch(error => {
            return null;
        });
};
