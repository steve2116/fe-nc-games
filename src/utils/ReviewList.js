import API from "./API.js";

const getReviews = ({ p, cat, sortby, order }) => {
    let urlStr = "/reviews?limit=10";
    if (isNaN(p)) p = 1;
    urlStr += `&p=${p}`;
    if (cat) urlStr += `&category=${cat}`;
    if (sortby) urlStr += `&sort_by=${sortby}`;
    if (order) urlStr += `&order=${order}`;
    return API.get(urlStr).then(({ data }) => data.reviews);
};

export default { getReviews };
