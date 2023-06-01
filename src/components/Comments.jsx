import { useEffect, useState, useContext } from "react";

import { userContext } from "../contexts/user.jsx";
import utils from "../utils/Comments.js";
import "../designs/Comments.css";

export default function Comments({ review_id }) {
    const { user } = useContext(userContext);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");
    const [loading, setLoading] = useState(false);
    const [disable, setDisable] = useState({ sending: false, empty: false });

    useEffect(() => {
        setLoading(true);
        if (review_id) {
            utils
                .getComments(review_id)
                .then((newComments) => setComments(newComments))
                .catch(() => setComments([]))
                .then(() => setLoading(false));
        } else {
            setComments([]);
            setLoading(false);
        }
    }, []);

    function postComment(event) {
        setDisable((curr) => {
            return { ...curr, sending: true };
        });
        event.preventDefault();
        const comment = {
            review_id: review_id,
            body: newComment,
            username: user.username,
        };
        setComments((curr) => {
            const newCom = {
                ...comment,
                author: comment.username,
                comment_id: -1,
                votes: 0,
            };
            delete newCom.username;
            return [newCom, ...curr];
        });
        setNewComment("Posting comment...");
        utils
            .postComment(review_id, comment)
            .then((postedComment) => {
                setNewComment("Comment posted");
                setComments((curr) => {
                    const newComs = [...curr];
                    newComs[0] = { ...postedComment };
                    return newComs;
                });
                return setTimeout(() => setNewComment(""), 1500);
            })
            .catch(() => {
                setComments((curr) => curr.slice(1));
                setNewComment("Failed to post comment");
                return setTimeout(() => setNewComment(comment.body), 1500);
            })
            .then(() =>
                setDisable((curr) => {
                    return { ...curr, sending: false };
                })
            );
    }

    useEffect(() => {
        if (newComment === "")
            setDisable((curr) => {
                return { ...curr, empty: true };
            });
        else
            setDisable((curr) => {
                return { ...curr, empty: false };
            });
    }, [newComment]);

    if (loading) return <p>Loading...</p>;
    return (
        <ul id="comment-list">
            {(() => {
                if (user.username === "guest") {
                    return (
                        <li className="list-comment login-comment">
                            <p>Log in to leave a comment</p>
                        </li>
                    );
                } else
                    return (
                        <form
                            className="list-comment"
                            onSubmit={postComment}
                        >
                            <label htmlFor="new-comment-body">
                                Post a new comment:{" "}
                            </label>
                            <textarea
                                id="new-comment-body"
                                value={newComment}
                                onChange={(e) => setNewComment(e.target.value)}
                                disabled={disable.sending}
                                placeholder="Enter comment here..."
                            />
                            <button
                                type="submit"
                                disabled={disable.sending || disable.empty}
                                id="post-comment"
                            >
                                Post comment
                            </button>
                        </form>
                    );
            })()}
            {comments.length === 0 ? (
                <li>
                    There are no comments. Share your thoughts to be the first!
                </li>
            ) : (
                comments.map(({ comment_id, body, author, votes }) => {
                    return (
                        <li
                            className="list-comment"
                            key={comment_id}
                        >
                            <p className="comment-info">{`${
                                author.length > 12
                                    ? `${author.slice(0, 6)}...`
                                    : author.length > 6
                                    ? `${author.slice(0, 6)}-\n${author.slice(
                                          6
                                      )}`
                                    : author
                            }\n${votes < 0 ? votes : `+${votes}`}`}</p>
                            <p className="comment-body">{body}</p>
                        </li>
                    );
                })
            )}
        </ul>
    );
}
