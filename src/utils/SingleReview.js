import API from "./API";

const getReview = (id) => {
    return API.get(`/reviews/${id}`).then(({ data }) => {
        return data.review;
    });
};

export default { getReview };
