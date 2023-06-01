import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import utils from "../utils/Categories.js";
import "../designs/Categories.css";

export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showDesc, setShowDesc] = useState({});

    useEffect(() => {
        setLoading(true);
        utils
            .getCategories()
            .then((cats) => setCategories(cats))
            .catch(() => {})
            .then(() => {
                setLoading(false);
                setShowDesc(
                    categories.reduce((nCats, { slug }) => {
                        return {
                            ...nCats,
                            [`cat-${slug.replace(" ", "-")}`]: false,
                        };
                    }, {})
                );
            });
    }, []);

    if (loading) return <p>Loading...</p>;
    return (
        <>
            <h2>Browse our Categories!</h2>
            <ul id="cats-list">
                {categories.map(({ slug, description }) => {
                    return (
                        <li
                            key={slug}
                            id={`cat-${slug.replace(" ", "-")}`}
                            onClick={(e) =>
                                setShowDesc((curr) => {
                                    const id = `cat-${slug.replace(" ", "-")}`;
                                    return {
                                        ...curr,
                                        [id]: !curr[id],
                                    };
                                })
                            }
                            onMouseLeave={(e) =>
                                setShowDesc((curr) => {
                                    return {
                                        ...curr,
                                        [`cat-${slug.replace(
                                            " ",
                                            "-"
                                        )}`]: false,
                                    };
                                })
                            }
                        >
                            {showDesc[`cat-${slug.replace(" ", "-")}`] ? (
                                <Link to={`/reviews?cat=${slug}`}>
                                    <h3>{slug}</h3>
                                </Link>
                            ) : (
                                <h3>{slug}</h3>
                            )}
                            <p
                                className={
                                    showDesc[`cat-${slug.replace(" ", "-")}`]
                                        ? "cats-desc"
                                        : "tiny-text"
                                }
                            >
                                {description}
                            </p>
                        </li>
                    );
                })}
            </ul>
        </>
    );
}
