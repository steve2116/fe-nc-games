import { useContext, useState } from "react";

import { userContext } from "../contexts/user";
import utils from "../utils/AccountInfo.js";

export default function AccountInfo() {
    const { user, setUser } = useContext(userContext);

    const [userLog, setUserLog] = useState({
        login: "",
        signup: { username: "", name: "", avatar_url: "" },
    });
    const [loading, setLoading] = useState(false);

    function handleLogin(event) {
        event.preventDefault();
        setLoading(true);
        utils
            .getUserByUsername(userLog.login)
            .then((user) => {
                setUser(user);
                setUserLog({
                    login: "",
                    signup: { username: "", name: "", avatar_url: "" },
                });
            })
            .catch(() => setUser({ username: "guest" }))
            .then(() => setLoading(false));
    }

    function handleSignup(event) {
        event.preventDefault();
        setLoading(true);
        const checkAvatar =
            /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u00a1-\uffff][a-z0-9\u00a1-\uffff_-]{0,62})?[a-z0-9\u00a1-\uffff]\.)+(?:[a-z\u00a1-\uffff]{2,}\.?))(?::\d{2,5})?(?:[/?#]\S*)?$/i.test(
                userLog.signup.avatar
            );
        utils
            .createUser(
                checkAvatar
                    ? userLog.signup
                    : { ...userLog.signup, avatar_url: undefined }
            )
            .then((user) => {
                setUser(user);
                setUserLog({
                    login: "",
                    signup: { username: "", name: "", avatar_url: "" },
                });
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
                        <>
                            <h2>Please log in or sign up</h2>
                            <form onSubmit={handleLogin}>
                                <h2>Log in</h2>
                                <label htmlFor="login-username">
                                    Username:{" "}
                                </label>
                                <input
                                    id="login-username"
                                    value={userLog.login}
                                    onChange={(e) =>
                                        setUserLog((curr) => {
                                            return {
                                                ...curr,
                                                login: e.target.value,
                                            };
                                        })
                                    }
                                    placeholder="Enter username..."
                                />
                                <button type="submit">Submit</button>
                            </form>
                            <form onSubmit={handleSignup}>
                                <h2>Sign up</h2>
                                <label htmlFor="signup-username">
                                    Username:{" "}
                                </label>
                                <input
                                    id="signup-username"
                                    value={userLog.signup.username}
                                    onChange={(e) =>
                                        setUserLog((curr) => {
                                            return {
                                                ...curr,
                                                signup: {
                                                    ...curr.signup,
                                                    username: e.target.value,
                                                },
                                            };
                                        })
                                    }
                                    placeholder="Enter username..."
                                    required
                                />
                                <label htmlFor="signup-name">Name: </label>
                                <input
                                    id="signup-name"
                                    value={userLog.signup.name}
                                    onChange={(e) =>
                                        setUserLog((curr) => {
                                            return {
                                                ...curr,
                                                signup: {
                                                    ...curr.signup,
                                                    name: e.target.value,
                                                },
                                            };
                                        })
                                    }
                                    placeholder="Enter name..."
                                    required
                                />
                                <label htmlFor="signup-avatar">
                                    Avatar URL:{" "}
                                </label>
                                <input
                                    id="signup-avatar"
                                    value={userLog.signup.avatar_url}
                                    onChange={(e) =>
                                        setUserLog((curr) => {
                                            return {
                                                ...curr,
                                                signup: {
                                                    ...curr.signup,
                                                    avatar_url: e.target.value,
                                                },
                                            };
                                        })
                                    }
                                    placeholder="Enter avatar URL..."
                                />
                                <button type="submit">Submit</button>
                            </form>
                        </>
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
