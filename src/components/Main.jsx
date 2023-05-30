import { Routes, Route } from "react-router-dom";
import { useContext } from "react";

import { userContext } from "../contexts/user";
import Home from "./Home.jsx";
import ReviewList from "./ReviewList.jsx";

export default function Main() {
    const { user, setUser } = useContext(userContext);

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
            </Routes>
        </>
    );
}
