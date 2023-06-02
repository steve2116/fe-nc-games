import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";

import utils from "../utils/ReviewList";
import ReviewsFilter from "./ReviewsFilter";
import "../designs/ReviewList.css";

export default function ReviewList() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();
    const [page, setPage] = useState(1);
    const [showFilter, setShowFilter] = useState(false);
    const [filterer, setFilterer] = useState({});

    useEffect(() => {
        setFilterer({
            p: Number(searchParams.get("p")),
            cat: searchParams.get("cat"),
            sortby: searchParams.get("sort_by"),
        });
    }, [
        searchParams.get("p"),
        searchParams.get("cat"),
        searchParams.get("sort_by"),
    ]);

    useEffect(() => {
        setPage(() => (filterer.p !== 0 ? filterer.p : 1));
    }, [filterer.p]);

    useEffect(() => {
        setLoading(true);
        console.log("A change occured", page, filterer.cat, filterer.sortby);
        utils
            .getReviews({
                ...filterer,
                p: page,
            })
            .then((reviews) => setReviews(reviews))
            .then(() => setLoading(false));
    }, [page, ...Object.values(filterer)]);

    if (loading) return <p>Loading reviews...</p>;
    return (
        <>
            <button
                onClick={() => setShowFilter((curr) => !curr)}
                className="reviews-filter-but"
            >
                Filter
            </button>
            <section className={showFilter ? "reviews-filter" : "hidden"}>
                <ReviewsFilter setFilterer={setFilterer} />
            </section>
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
                    to={`/reviews?p=${page - 1}${
                        filterer.cat ? `&cat=${filterer.cat}` : ""
                    }${filterer.sortby ? `&sort_by=${filterer.sortby}` : ""}`}
                >
                    previous
                </Link>
                <Link
                    className={reviews.length === 0 ? "hidden" : ""}
                    to={`/reviews?p=${page + 1}${
                        filterer.cat ? `&cat=${filterer.cat}` : ""
                    }${filterer.sortby ? `&sort_by=${filterer.sortby}` : ""}`}
                >
                    next
                </Link>
            </section>
        </>
    );
}
