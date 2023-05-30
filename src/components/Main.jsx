import { Routes, Route } from "react-router-dom";

import Home from "./Home.jsx";
import ReviewList from "./ReviewList.jsx";

export default function Main() {
    return (
        <>
            <p>Currently logged in as: guest</p>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/reviews"
                    element={<ReviewList />}
                />
            </Routes>
        </>
    );
}
