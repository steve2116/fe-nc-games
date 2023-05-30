import axios from "axios";

const API = axios.create({ baseURL: "https://chatmat.onrender.com/api" });

const getReviews = ({ p }) => {
    if (isNaN(p)) p = 1;
    return API.get(`/reviews?limit=10&p=${p}`).then(({ data }) => {
        return data.reviews;
    });
};

export default { getReviews };
