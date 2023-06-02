import { useState } from "react";

import Navbar from "./Navbar.jsx";
import Categories from "./Categories";
import Main from "./Main.jsx";
import "../designs/App.css";

export default function App() {
    const [hoverClass, setHoverClass] = useState("content-container");

    return (
        <>
            <nav>
                <Navbar />
            </nav>
            <p
                className={
                    hoverClass === "content-container"
                        ? "cat-filter-text"
                        : "hidden"
                }
            >
                Filter by category
            </p>
            <div className={hoverClass}>
                <div
                    onClick={() => setHoverClass("hover-cats")}
                    onMouseLeave={() => setHoverClass("content-container")}
                    id="category-menu"
                >
                    <div
                        className={
                            hoverClass === "content-container" ? "hidden" : ""
                        }
                    >
                        <Categories />
                    </div>
                </div>
                <main>
                    <Main />
                </main>
            </div>
            <footer>PLACEHOLDER FOOTER</footer>
        </>
    );
}
