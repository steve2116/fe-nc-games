import { useState } from "react";

import "../designs/ReviewsFilter.css";

export default function ReviewsFilter({ setSearchParams }) {
    const [radios, setRadios] = useState({ owner: false });

    function submitSortby(event) {
        if (event) event.preventDefault();
        Object.keys(radios).forEach((key) => {
            if (radios[key]) {
                setSearchParams((curr) => {
                    const newParams = [];
                    for (const [param, value] of curr.entries()) {
                        if (param === "sortby") newParams.push(["sortby", key]);
                        else newParams.push([param, value]);
                    }
                    return new URL(newParams);
                });
            }
        });
    }

    function sortbyChange(event) {
        setRadios((curr) => {
            return { ...curr, [event.target.value]: !curr[event.target.value] };
        });
        submitSortby();
    }

    return (
        <>
            <h2>Filter options</h2>
            <form
                onSubmit={submitSortby}
                className="reviews-filter-sortby"
            >
                <h3>Sort by property</h3>
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
            </form>
        </>
    );
}
