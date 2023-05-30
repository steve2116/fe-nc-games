import { useEffect, useState } from "react";

import utils from "../utils/Comments.js";
import "../designs/Comments.css";

export default function Comments({ review_id }) {
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        if (review_id) {
            utils
                .getComments(review_id)
                .then((newComments) => setComments(newComments))
                .catch(({ response }) => {
                    console.log(response.data.msg);
                    if (response.status == "404") setComments([]);
                })
                .then(() => setLoading(false));
        } else {
            setComments([]);
            setLoading(false);
        }
    }, [review_id]);

    if (loading) return <p>Loading comments...</p>;
    if (comments.length === 0)
        return (
            <ul>
                <li>No comments</li>
            </ul>
        );
    return (
        <ul id="comment-list">
            {comments.map(({ comment_id, body, author, votes }) => {
                return (
                    <li
                        className="list-comment"
                        key={comment_id}
                    >
                        <p>Comment by {author}</p>
                        <p>{body}</p>
                        <p>{votes > 0 ? `+${votes}` : votes}</p>
                    </li>
                );
            })}
        </ul>
    );
}
