import React, { useState, useEffect } from "react";
import "../Cars.css"

function Cars() {

    const [formData, setFormData] = useState({
        "brand": "string",
        "model": "string",
        "year": 0,
        "mileage": 0,
        "price": 0,
        "description": "string"
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:3000/cars", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(formData),
        });
        const data = await res.json();
        console.log(data)

        if (res.ok) {
            alert("Sikeres autó feltöltés!")
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
            <div class="urlap_auto_feltoltes">
                <h1>Feltöltés</h1>
                <form onSubmit={handleSubmit}>
                    <input type="text" placeholder="Brand" onChange={handleChange} name="brand" required></input>
                    <input type="text" placeholder="Model" onChange={handleChange} name="model" required></input>
                    <input type="number" placeholder="Year" onChange={handleChange} name="year" required></input>
                    <input type="number" placeholder="Mileage" onChange={handleChange} name="mileage" required></input>
                    <input type="number" placeholder="Price" onChange={handleChange} name="price" required></input>
                    <input type="text" placeholder="Description" onChange={handleChange} name="description" required></input>
                    <button>Feltöltés</button>
                </form>
            </div>
        </>

    );
}

export default Cars;