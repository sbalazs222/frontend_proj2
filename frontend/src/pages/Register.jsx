import { useNavigate } from "react-router-dom";
import { useState } from 'react';

function Register(){
    const navigate = useNavigate();

    const [formData,setFormData] = useState({
        username: "",
        email: "",
        password: "",
        address: "",
        phone_number: "",
    });

    const handleSubmit = async (e)=>{
        e.preventDefault();
        const res = await fetch("http://localhost:3000/register", {
            method:"POST",
            headers: {"Content-Type":"application/json"},
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        if (res.ok) {
            alert("Sikeres regiszráció!")
            navigate("/")
        }
        else{
            console.log(data)
        }
    }

    const handleChange = (e) =>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }
    
    return(
        <>
        <h1>Regisztráció</h1>

        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" onChange={handleChange} required></input>
            <input type="text" placeholder="Password" onChange={handleChange} required></input>
            <input type="email" placeholder="Email" onChange={handleChange} required></input>
            <input type="text" placeholder="Address" onChange={handleChange} required></input>
            <input type="text" placeholder="+36 70 123 4567" onChange={handleChange} required></input>
            <button>Regisztráció</button>
        </form>
        </>
    )
}

export default Register;