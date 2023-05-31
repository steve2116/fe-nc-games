import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import Comments from "./Comments.jsx";
import utils from "../utils/SingleReview.js";
import "../designs/SingleReview.css";

export default function SingleReview() {
    const { review_id } = useParams();
    const [review, setReview] = useState({});
    const [loading, setLoading] = useState(false);
    const [posNeg, setPosNeg] = useState(0);

    useEffect(() => {
        setLoading(true);
        utils
            .getReview(review_id)
            .then((newReview) => setReview(newReview))
            .then(() => setLoading(false))
            .catch((err) => {});
    }, []);

    function scoreChange(change) {
        if (Array.isArray(posNeg)) return;
        const diff = change === posNeg ? -1 * change : change - posNeg;
        setPosNeg((curr) => (change === curr ? 0 : change));
        utils.votesChange(review_id, diff).catch(() => {
            setPosNeg([
                change - diff,
                <p>Error while making reaction request...</p>,
            ]);
        });
    }

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <article id="single-review">
                <section id="review">
                    {<h2>{review.title}</h2>}
                    <p className="review-owner">by {review.owner}</p>
                    <p>Category: {review.category}</p>

                    {Array.isArray(posNeg)
                        ? (() => {
                              setTimeout(() => {
                                  setPosNeg((curr) => curr[0]);
                              }, 3000);
                              return posNeg[1];
                          })()
                        : ""}

                    <div className="scorebar">
                        <button
                            onClick={() => {
                                scoreChange(1);
                            }}
                            className="pos"
                        >
                            +
                        </button>
                        <p className="score">
                            Score:{" "}
                            {Number(review.votes) +
                                (Array.isArray(posNeg) ? posNeg[0] : posNeg) >
                            0
                                ? `+${
                                      Number(review.votes) +
                                      (Array.isArray(posNeg)
                                          ? posNeg[0]
                                          : posNeg)
                                  }`
                                : Number(review.votes) +
                                  (Array.isArray(posNeg) ? posNeg[0] : posNeg)}
                        </p>
                        <button
                            onClick={() => {
                                scoreChange(-1);
                            }}
                            className="neg"
                        >
                            -
                        </button>
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
