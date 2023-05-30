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
            <div className={hoverClass}>
                <div
                    onClick={() => {
                        setHoverClass("hover-cats");
                    }}
                    onMouseLeave={() => {
                        setHoverClass("content-container");
                    }}
                    id="category-menu"
                >
                    <Categories />
                </div>
                <main>
                    <Main />
                </main>
            </div>
            <footer>PLACEHOLDER FOOTER</footer>
        </>
    );
}
