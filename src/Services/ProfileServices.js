import axios from "axios";
import { authHeader } from "../Helpers";

export const me = () => {
    return axios
        .get(process.env.REACT_APP_API_URL + "me", {
            headers: { ...authHeader(), "Content-Type": "application/json" },
        })
        .then(response => {
            const data = response.data;
            if (data.message === "Error") {
                return Promise.reject(data.data);
            } else {
                saveProfile(JSON.stringify(data.data));
                return data.data;
            }
        })
        .catch(error => {
            return Promise.reject(error);
        });
};

export const getProfile = () => {
    return sessionStorage.getItem("profile");
};

const saveProfile = profile => {
    return sessionStorage.setItem("profile", profile);
};
