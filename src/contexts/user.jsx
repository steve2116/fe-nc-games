import { createContext, useState } from "react";

export const userContext = createContext();

export function UserProvider({ children }) {
    const [user, setUser] = useState({
        username: "anonymous",
        name: "N/A",
        avatar_url:
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi.ytimg.com%2Fvi%2Ft7fny5HBW0g%2Fmaxresdefault.jpg&f=1&nofb=1&ipt=1d3eb5ffc4bfbec4ece72307b31c97c9fa8f4982c9b2b12729652abc936dd31d&ipo=images",
    });

    return (
        <userContext.Provider value={{ user, setUser }}>
            {children}
        </userContext.Provider>
    );
}
