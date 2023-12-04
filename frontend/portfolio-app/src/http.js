export async function registerUser(user) {
    const response = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const resData = await response.json();
    return resData;
}

export async function login(email, password) {
    const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    const resData = await response.json();
    return resData;
}

export async function getAllCryptocurrencies() {
    const response = await fetch("http://localhost:5000/crypto/list_all_cryptocurrencies", {
        method: "GET",
        headers: {
            Authorization: "Bearer " + localStorage.getItem("token")
        }
    });

    const resData = await response.json();
    return resData;
}

