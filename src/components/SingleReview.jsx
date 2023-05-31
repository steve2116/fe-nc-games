import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Comments from "./Comments.jsx";
import utils from "../utils/SingleReview.js";
import "../designs/SingleReview.css";

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
                    <div className="scorebar">
                        <button className="pos">+</button>
                        <p className="score">
                            Score:{" "}
                            {review.votes > 0
                                ? `+${review.votes}`
                                : review.votes}
                        </p>
                        <button className="neg">-</button>
                    </div>
                    <img
                        src={review.review_img_url}
                        alt={`A ${review.category} game by ${review.designer}`}
                    />
                    <p>{review.review_body}</p>
                </section>
                <section id="single-review-comments">
                    <Comments review_id={review.review_id} />
                </section>
            </article>
        </>
    );
}
