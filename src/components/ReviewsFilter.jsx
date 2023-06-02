import { useState } from "react";

import "../designs/ReviewsFilter.css";

export default function ReviewsFilter({ setFilterer }) {
    const [radios, setRadios] = useState({ owner: false });

    function submitSortby(event) {
        if (event) event.preventDefault();
        console.log("HERE");
        Object.keys(radios).forEach((key) => {
            if (radios[key]) {
                setFilterer((curr) => {
                    return { ...curr, sortby: key };
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
