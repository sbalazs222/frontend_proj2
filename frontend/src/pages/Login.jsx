import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import "../Login.css"

function Login({ setIsLoggedIn }) {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            alert("Sikeres Bejelentkezés!")
            setIsLoggedIn(true)
            navigate('/')
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    return (
        <>
            <div class="urlap_log">
                <h1>Bejelentkezés</h1>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder="Email" name="email" onChange={handleChange} required></input>
                    <input type="password" placeholder="Password" name="password" onChange={handleChange} required></input>
                    <button>Bejelentkezés</button>
                </form>
            </div>

        </>
    );
}

export default Login;