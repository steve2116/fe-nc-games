import { Routes, Route } from "react-router-dom";

import ReviewList from "./ReviewList.jsx";

export default function Main() {
    return (
        <>
            <Routes>
                <Route
                    path="/reviews"
                    element={<ReviewList />}
                />
            </Routes>
        </>
    );
}
