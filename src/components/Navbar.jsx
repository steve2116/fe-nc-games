import { Link } from "react-router-dom";

import logo from "../assets/ChatmatSmall.png";
import "../designs/Navbar.css";

export default function Navbar() {
    return (
        <>
            <img
                className="logo"
                src={logo}
            />
            <section>
                <h1>ChatMat</h1>
                <p>A site for sharing reviews on games</p>
            </section>
            <div>
                <Link to="/">Home</Link>
                <Link to="/reviews">Reviews</Link>
            </div>
        </>
    );
}
