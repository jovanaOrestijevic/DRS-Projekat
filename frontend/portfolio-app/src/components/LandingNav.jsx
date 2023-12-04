import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../http";

export default function LandingNav() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function handleLogin() {

        const response = await login(email, password);

        if (!response.error) {
            localStorage.setItem("token", response.token);
            navigate("/MainPage");
        }
        else {
            setError(response.error);
        }

        setEmail("");
        setPassword("");
    };


    return (
        <nav>
            <p className="welcome">Log in to get started</p>
            <form className="login">
                {error && <p style={{ color: "red", marginRight: "3rem" }} className="welcome">{error}</p>}

                <input
                    type="text"
                    placeholder="email"
                    className="login__input login__input--user"
                    value={email}
                    onChange={(e) => {
                        setEmail(e.target.value);
                        setError("");
                    }}
                />

                <input
                    type="password"
                    placeholder="password"
                    className="login__input login__input--pin"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    type="button"
                    className="login__btn"
                    onClick={() => handleLogin()}
                >
                    &rarr;
                </button>
            </form>
        </nav>
    );
};

