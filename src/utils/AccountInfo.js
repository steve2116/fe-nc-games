import API from "./API";

const getUserByUsername = (username) => {
    return API.get(`/users/${username}`).then(({ data }) => data.user);
};

export default { getUserByUsername };
