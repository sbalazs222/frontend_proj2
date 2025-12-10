import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import '../Register.css'

function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
        username: "",
        address: "",
        phone: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
            alert("Sikeres regiszráció!")
            navigate("/")
        }
        else {
            console.log(data)
        }
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }

    return (
        <>
            <div class="urlap_reg">
                <h1>Regisztráció</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Name" onChange={handleChange} name="username" required></input>
                    <input type="password" placeholder="Password" onChange={handleChange} name="password" required></input>
                    <input type="email" placeholder="Email" onChange={handleChange} name="email" required></input>
                    <input type="text" placeholder="Address" onChange={handleChange} name="address" required></input>
                    <input type="text" placeholder="+36 70 123 4567" onChange={handleChange} name="phone" required></input>
                    <button>Regisztráció</button>
                </form>
            </div>
        </>
    )
}

export default Register;