import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Login({setIsLoggenIn}){
    const navigate = useNavigate();

    const[formData,setFormData] = useState({
        password:"",
        email:""
    });

    const handleSubmit = async (e) =>{
        e.preventdefault();
        const res = await fetch("http://localhost:3000/login",{
            method:"POST",
            headers: { "Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        const data = await res.json();

        if(res.ok) {
            alert("Sikeres Bejelentkezés!")
            setIsLoggenIn(true)
            navigate('/')
        }
    };

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    };

    return(
        <>
        <h1>Bejelentkezés</h1>
        <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email" onChange={handleChange} required></input>
            <input type="password" placeholder="Password" onChange={handleChange} required></input>
            <button>Bejelentkezés</button>
        </form>
        </>
    );
}

export default Login;