import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import "../designs/ReviewsFilter.css";

export default function ReviewsFilter({ filterer, page }) {
    const [radios, setRadios] = useState({ owner: false });

    useEffect(() => {
        setRadios((curr) => {
            return { ...curr, [filterer.sortby]: true };
        });
    }, [filterer.sortby]);

    function submitSortby(event) {
        event.preventDefault();
    }
    function sortbyChange(event) {
        setRadios((curr) => {
            return { ...curr, [event.target.value]: !curr[event.target.value] };
        });
    }

    return (
        <>
            <h2>Filter options</h2>
            <form
                onSubmit={submitSortby}
                className="reviews-filter-sortby"
            >
                <h3>Sort by property</h3>
                <Link
                    to={`/reviews?p=${page}${
                        filterer.cat ? `&cat=${filterer.cat}` : ""
                    }&sort_by=owner`}
                >
                    <label>
                        <input
                            type="radio"
                            name="sortby"
                            value="owner"
                            onChange={sortbyChange}
                            checked={radios.owner}
                        />
                        Author
                    </label>
                </Link>
            </form>
        </>
    );
}
