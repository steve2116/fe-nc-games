import API from "./API";

const getCategories = () => {
    return API.get("/categories").then(({ data }) => data.categories);
};

export default { getCategories };
