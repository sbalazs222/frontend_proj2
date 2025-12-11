import React, { useState, useEffect } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';

function Home() {

    const [brand, setBrand] = useState([]);
    const [model, setModel] = useState("");
    const [year, setYear] = useState("");
    const [mileage, setMileage] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [selectedCar, setSelectedCar] = useState(null);
    const [error, setError] = useState("");
    const [cars, setCars] = useState([]);


    const fetchCars = async () => {
        try {
            const response = await fetch("http://localhost:3000/cars");
            const data = await response.json();
            if (response.ok) {
                setCars(data);
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError("Failed to fetch cars");
        }
    };

    useEffect(() => {
        fetchCars();
    }, []);

    return (
        <>
            <h1>Home</h1>
            {cars.map((car) => (
                <Card key={car}>
                    <Card.Body>
                        <Card.Title>{car.brand} {car.model}</Card.Title>
                        <Card.Text>
                            Évjárat: {car.year} <br />
                            Km. óra állás: {car.mileage} <br />
                            Leírás: {car.description} <br />
                            Ár: {car.price}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </>
    );
}

export default Home;