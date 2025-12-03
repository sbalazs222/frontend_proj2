function Register(){
    return(
        <>
        <h1>Regisztráció</h1>

        <form>
            <input type="text" placeholder="Name" required></input>
            <input type="email" placeholder="Email"required></input>
            <input type="text" placeholder="Address" required></input>
            <input type="text" placeholder="+36 70 123 4567"></input>
            <button>Regisztráció</button>
        </form>
        </>
    )
}

export default Register;