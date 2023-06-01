import API from "./API";

const getUserByUsername = (username) => {
    return API.get(`/users/${username}`).then(({ data }) => data.user);
};

const createUser = (user) => {
    return API.post("/users", user).then(({ data }) => data.user);
};

export default { getUserByUsername, createUser };
