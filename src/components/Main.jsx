import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { userContext } from "../contexts/user";
import Home from "./Home.jsx";
import ReviewList from "./ReviewList.jsx";
import SingleReview from "./SingleReview.jsx";
import AccountInfo from "./AccountInfo";

export default function Main() {
    const { user } = useContext(userContext);

    return (
        <>
            <p>Currently logged in as: {user.username}</p>
            <Routes>
                <Route
                    path="/"
                    element={<Home />}
                />
                <Route
                    path="/reviews"
                    element={<ReviewList />}
                />
                <Route
                    path="/reviews/:review_id"
                    element={<SingleReview />}
                />
                <Route
                    path="/account"
                    element={<AccountInfo />}
                />
            </Routes>
        </>
    );
}
