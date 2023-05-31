import { useContext, useState } from "react";

import { userContext } from "../contexts/user";
import utils from "../utils/AccountInfo.js";

export default function AccountInfo() {
    const { user, setUser } = useContext(userContext);

    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(false);

    function handleSubmit(event) {
        event.preventDefault();
        setLoading(true);
        utils
            .getUserByUsername(username)
            .then((user) => {
                setUser(user);
                setUsername("");
            })
            .catch(() => setUser({ username: "guest" }))
            .then(() => setLoading(false));
    }

    return (
        <article>
            {loading ? <p>Loading...</p> : ""}
            {(() => {
                if (user.username === "guest") {
                    return (
                        <form onSubmit={handleSubmit}>
                            <h2>Log in</h2>
                            <label htmlFor="login-username">Username: </label>
                            <input
                                id="login-username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter username..."
                            />
                            <button type="submit">Save changes</button>
                        </form>
                    );
                } else {
                    return (
                        <section>
                            <button
                                onClick={() => {
                                    setUser({ username: "guest" });
                                }}
                            >
                                Sign out
                            </button>
                            <p>{user.username}</p>
                            <p>{user.name}</p>
                            <img
                                src={user.avatar_url}
                                alt="Your avatar"
                            />
                        </section>
                    );
                }
            })()}
        </article>
    );
}
