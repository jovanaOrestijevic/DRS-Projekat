import { useState } from "react";
import { registerUser } from "../http";
import { useNavigate } from "react-router-dom";

export default function RegistrationForm() {
    const [first_name, setName] = useState("");
    const [last_name, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [phone_number, setPhoneNum] = useState("");
    const [password, setPassword] = useState("");
    const [country, setCountry] = useState("");
    const [city, setCity] = useState("");
    const [address, setAddress] = useState("");
    const [error, setError] = useState("");

    const navigate = useNavigate();

    async function handleRegistration(e) {

        e.preventDefault();

        const user = {
            first_name,
            last_name,
            email,
            phone_number,
            password,
            country,
            city,
            address,
        };
        setError("");

        const response = await registerUser(user);

        if (!response.error) {
            navigate("/");
        }
        else {
            setError(response.error);
        }


    };

    return (
        <div className="container">
            <form action="" className="add-form" onSubmit={handleRegistration}>
                <div className="form-control">
                    <label>First Name</label>
                    <input
                        type="text"
                        required
                        placeholder="Enter your first name"
                        value={first_name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Last name</label>
                    <input
                        type="text"
                        required
                        placeholder="Enter your last name"
                        value={last_name}
                        onChange={(e) => setLname(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Email</label>
                    <input
                        type="text"
                        required
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    {error && <p className="error-message">{error}</p>}
                </div>
                <div className="form-control">
                    <label>Phone number</label>
                    <input
                        type="text"
                        placeholder="Enter your number"
                        value={phone_number}
                        onChange={(e) => setPhoneNum(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Password</label>
                    <input
                        type="password"
                        required
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Country</label>
                    <input
                        type="text"
                        placeholder="Enter your country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>City</label>
                    <input
                        type="text"
                        placeholder="Enter the city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div className="form-control">
                    <label>Address</label>
                    <input
                        type="text"
                        placeholder="Enter your address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>

                <input type="submit" value="Register" className="btn btn-block" />
            </form>
        </div>
    );
};

