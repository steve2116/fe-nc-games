import API from "../utils/API.js";

const getComments = (review_id) => {
    return API.get(`/reviews/${review_id}/comments`).then(
        ({ data }) => data.comments
    );
};

const postComment = (review_id, comment) => {
    return API.post(`/reviews/${review_id}/comments`, comment).then(
        ({ data }) => data.comment
    );
};

export default { getComments, postComment };
