import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import utils from "../utils/SingleReview.js";
import "../designs/SingleReview.css";
import Comments from "./Comments.jsx";

export default function SingleReview() {
    const { review_id } = useParams();
    const [review, setReview] = useState({});
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        utils
            .getReview(review_id)
            .then((newReview) => setReview(newReview))
            .then(() => setLoading(false))
            .catch((err) => {});
    }, []);
    if (loading) return <p>Loading...</p>;
    return (
        <>
            <article id="single-review">
                <section id="review">
                    {<h2>{review.title}</h2>}
                    <p className="review-owner">by {review.owner}</p>
                    <p>Category: {review.category}</p>
                    <p className="score">
                        Score:{" "}
                        {review.votes > 0 ? `+${review.votes}` : review.votes}
                    </p>
                    <img src={review.review_img_url} />
                    <p>{review.review_body}</p>
                </section>
                <section id="single-review-comments">
                    <Comments review_id={review.review_id} />
                </section>
            </article>
        </>
    );
}