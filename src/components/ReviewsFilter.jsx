import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../designs/ReviewsFilter.css";

export default function ReviewsFilter({ filterer, page, setShowFilter }) {
    const sortby = {
        owner: false,
        title: false,
        created_at: false,
        votes: false,
        comments: false,
    };

    const [sRadios, setSRadios] = useState({});
    const [oRadios, setORadios] = useState({});

    useEffect(() => {
        if (!filterer.sortby) setSRadios({ ...sortby, created_at: true });
        else
            setSRadios((curr) => {
                return { ...curr, [filterer.sortby]: true };
            });
    }, [filterer.sortby]);

    useEffect(() => {
        if (!filterer.order) setORadios({ asc: false, desc: true });
        else
            setORadios((curr) => {
                return { ...curr, [filterer.order]: true };
            });
    }, [filterer.order]);

    function submitSortby(event) {
        event.preventDefault();
    }

    return (
        <>
            <h2>Filter options</h2>
            <form
                onSubmit={submitSortby}
                className="reviews-filter-sortby"
            >
                <h3>Sort by</h3>
                {sRadios.owner ? (
                    <label className="reviews-filter-label">
                        <input
                            type="radio"
                            name="sortby"
                            value="owner"
                            defaultChecked
                        />
                        Author
                    </label>
                ) : (
                    <Link
                        className="reviews-filter-label"
                        to={`/reviews?p=${page}${
                            filterer.cat ? `&cat=${filterer.cat}` : ""
                        }&sort_by=owner${
                            filterer.order ? `&order=${filterer.order}` : ""
                        }`}
                    >
                        <label>
                            <input
                                type="radio"
                                name="sortby"
                                value="owner"
                            />
                            Author
                        </label>
                    </Link>
                )}
                {sRadios.title ? (
                    <label className="reviews-filter-label">
                        <input
                            type="radio"
                            name="sortby"
                            value="title"
                            defaultChecked
                        />
                        Title
                    </label>
                ) : (
                    <Link
                        className="reviews-filter-label"
                        to={`/reviews?p=${page}${
                            filterer.cat ? `&cat=${filterer.cat}` : ""
                        }&sort_by=title${
                            filterer.order ? `&order=${filterer.order}` : ""
                        }`}
                    >
                        <label>
                            <input
                                type="radio"
                                name="sortby"
                                value="title"
                            />
                            Title
                        </label>
                    </Link>
                )}
                {sRadios.created_at ? (
                    <label className="reviews-filter-label">
                        <input
                            type="radio"
                            name="sortby"
                            value="created_at"
                            defaultChecked
                        />
                        Creation date
                    </label>
                ) : (
                    <Link
                        className="reviews-filter-label"
                        to={`/reviews?p=${page}${
                            filterer.cat ? `&cat=${filterer.cat}` : ""
                        }&sort_by=created_at${
                            filterer.order ? `&order=${filterer.order}` : ""
                        }`}
                    >
                        <label>
                            <input
                                type="radio"
                                name="sortby"
                                value="date"
                            />
                            Creation date
                        </label>
                    </Link>
                )}
                {sRadios.votes ? (
                    <label className="reviews-filter-label">
                        <input
                            type="radio"
                            name="sortby"
                            value="votes"
                            defaultChecked
                        />
                        Score
                    </label>
                ) : (
                    <Link
                        className="reviews-filter-label"
                        to={`/reviews?p=${page}${
                            filterer.cat ? `&cat=${filterer.cat}` : ""
                        }&sort_by=votes${
                            filterer.order ? `&order=${filterer.order}` : ""
                        }`}
                    >
                        <label>
                            <input
                                type="radio"
                                name="sortby"
                                value="votes"
                            />
                            Score
                        </label>
                    </Link>
                )}
                {sRadios.designer ? (
                    <label className="reviews-filter-label">
                        <input
                            type="radio"
                            name="sortby"
                            value="designer"
                            defaultChecked
                        />
                        Designer
                    </label>
                ) : (
                    <Link
                        className="reviews-filter-label"
                        to={`/reviews?p=${page}${
                            filterer.cat ? `&cat=${filterer.cat}` : ""
                        }&sort_by=designer${
                            filterer.order ? `&order=${filterer.order}` : ""
                        }`}
                    >
                        <label>
                            <input
                                type="radio"
                                name="sortby"
                                value="designer"
                            />
                            Designer
                        </label>
                    </Link>
                )}
                {sRadios.comment_count ? (
                    <label className="reviews-filter-label">
                        <input
                            type="radio"
                            name="sortby"
                            value="comment_count"
                            defaultChecked
                        />
                        Comment count
                    </label>
                ) : (
                    <Link
                        className="reviews-filter-label"
                        to={`/reviews?p=${page}${
                            filterer.cat ? `&cat=${filterer.cat}` : ""
                        }&sort_by=comment_count${
                            filterer.order ? `&order=${filterer.order}` : ""
                        }`}
                    >
                        <label>
                            <input
                                type="radio"
                                name="sortby"
                                value="comment_count"
                            />
                            Comment count
                        </label>
                    </Link>
                )}
            </form>
            <form
                onSubmit={submitSortby}
                className="reviews-filter-order"
            >
                <h3>Sort order</h3>
                {oRadios.asc ? (
                    <label className="reviews-filter-label">
                        <input
                            type="radio"
                            name="sortby"
                            value="asc"
                            defaultChecked
                        />
                        Ascending
                    </label>
                ) : (
                    <Link
                        className="reviews-filter-label"
                        to={`/reviews?p=${page}${
                            filterer.cat ? `&cat=${filterer.cat}` : ""
                        }${
                            filterer.sortby ? `&sort_by=${filterer.sortby}` : ""
                        }&order=asc`}
                    >
                        <label>
                            <input
                                type="radio"
                                name="sortby"
                                value="votes"
                            />
                            Acsending
                        </label>
                    </Link>
                )}
                {oRadios.desc ? (
                    <label className="reviews-filter-label">
                        <input
                            type="radio"
                            name="sortby"
                            value="desc"
                            defaultChecked
                        />
                        Descending
                    </label>
                ) : (
                    <Link
                        className="reviews-filter-label"
                        to={`/reviews?p=${page}${
                            filterer.cat ? `&cat=${filterer.cat}` : ""
                        }${
                            filterer.sortby ? `&sort_by=${filterer.sortby}` : ""
                        }&order=desc`}
                    >
                        <label>
                            <input
                                type="radio"
                                name="sortby"
                                value="desc"
                            />
                            Descending
                        </label>
                    </Link>
                )}
            </form>
            <button
                onClick={() => setShowFilter((curr) => !curr)}
                className="reviews-filter-but"
            >
                Close
            </button>
        </>
    );
}
