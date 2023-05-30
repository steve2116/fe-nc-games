import API from "./API.js";

const getReviews = ({ p }) => {
    if (isNaN(p)) p = 1;
    return API.get(`/reviews?limit=10&p=${p}`).then(({ data }) => data.reviews);
};

export default { getReviews };
