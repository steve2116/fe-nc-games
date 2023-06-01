import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import utils from "../utils/ReviewList";
import "../designs/ReviewList.css";

export default function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);

    const queries = { p: searchParams.get("p"), cat: searchParams.get("cat") };

    useEffect(() => {
        setPage(() => {
            if (Number(queries.p) !== 0) return Number(queries.p);
            else return 1;
        });
    }, [queries.p]);

    useEffect(() => {
        setLoading(true);
        utils
            .getReviews({
                p: page,
                cat: queries.cat,
            })
            .then((reviews) => setReviews(reviews))
            .then(() => setLoading(false));
    }, [page, queries.cat]);

    if (loading) return <p>Loading reviews...</p>;
    return (
        <>
            <ul id="reviewlist">
                {reviews.map(
                    ({ title, owner, review_img_url, review_id, category }) => {
                        return (
                            <Link
                                key={review_id}
                                to={`/reviews/${review_id}`}
                            >
                                <li className="list-review">
                                    <p className="reviewlist-title">{title}</p>
                                    <p className="reviewlist-owner">
                                        by {owner}
                                    </p>
                                    <img
                                        src={review_img_url}
                                        alt={`A ${category} review image`}
                                    />
                                </li>
                            </Link>
                        );
                    }
                )}
            </ul>
            <section>
                <Link
                    className={page > 1 ? "" : "hidden"}
                    to={`/reviews?p=${page - 1}`}
                >
                    previous
                </Link>
                <Link
                    className={reviews.length === 0 ? "hidden" : ""}
                    to={`/reviews?p=${page + 1}`}
                >
                    next
                </Link>
            </section>
        </>
    );
}
