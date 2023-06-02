import API from "./API.js";

const getReviews = ({ p, cat }) => {
    let urlStr = "/reviews?limit=10";
    if (isNaN(p)) p = 1;
    urlStr += `&p=${p}`;
    if (cat) urlStr += `&category=${cat}`;
    return API.get(urlStr).then(({ data }) => data.reviews);
};

export default { getReviews };
