function Login(){
    return(
        <>
        <h1>Bejelentkezés</h1>
        <form>
            <input type="text" placeholder="Name" required></input>
            <input type="email" placeholder="Email"required></input>
            <button>Bejelentkezés</button>
        </form>
        </>
    );
}

export default Login;