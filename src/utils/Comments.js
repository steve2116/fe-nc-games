import API from "../utils/API.js";

const getComments = (review_id) => {
    return API.get(`/reviews/${review_id}/comments`).then(
        ({ data }) => data.comments
    );
};

export default { getComments };
