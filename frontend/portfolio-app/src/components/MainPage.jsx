import React, { useEffect, useState } from "react";
import { getAllCryptocurrencies } from "../http";
import { useNavigate } from "react-router-dom";
import CryptoAllList from "./CryptoAllList";

export default function MainPage({ turnOnModal, turnOnErroModal }) {
    const navigate = useNavigate();

    const [allCryptocurrencies, setAllCryptocurrencies] = useState([]);

    const today = new Date();
    const date =
        today.getDate() + "/" + (today.getMonth() + 1) + "/" + today.getFullYear();

    function handleLogOut() {
        localStorage.clear();
        navigate("/");
    };


    useEffect(() => {

        async function fetchData() {
            const response = await getAllCryptocurrencies();
            console.log(response)
            setAllCryptocurrencies(response);
        };

        fetchData();

        const intervalId = setInterval(fetchData, 1 * 60 * 1000);
        return () => clearInterval(intervalId);
    }, []);

    return (
        <main className="app">
            <div className="balance">
                <p className="balance__date">
                    As of <span className="date">{date}</span>
                </p>
                <button className="btn" onClick={handleLogOut}>
                    logout
                </button>
            </div>
            <div className="movements">
                <CryptoAllList cryptoList={allCryptocurrencies} />
            </div>
        </main>
    );
};
