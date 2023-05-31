import API from "./API";

const getReview = (id) => {
    return API.get(`/reviews/${id}`).then(({ data }) => data.review);
};

const votesChange = (id, change) => {
    return API.patch(`/reviews/${id}`, { inc_votes: change });
};

export default { getReview, votesChange };
