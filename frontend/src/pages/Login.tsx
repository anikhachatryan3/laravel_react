import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './Login.css';

const Login = () => {

    let navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    function LogInUser() {
        axios.post(`http://127.0.0.1:8000/api/login`, {
            email: email,
            password: password
        })
        .then((response) => {
            let path = `/`;
            navigate(path);
            // console.log("RESPONSE: ", response);
            setError(false);
        })
        .catch((error) => {
            // console.log("ERROR: ", error);
            setError(true);
        });
    }

    useEffect(() => {
        const handleError = () => {
            setError(false);
        }
        handleError();
    }, [email, password]);

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    return (
        <>
            <header className="App-header">
                <h1>LOGIN</h1>
            </header>
            <main>
                <div className="loginPage">
                    { error &&
                        <div className="errorMessage">
                            Email or password is incorrect.
                        </div>
                    }
                    <br />
                    <form className="loginForm">
                        <label className="emailItem">
                            <b>
                                Email:&nbsp;
                            </b>
                        </label>
                        <input type="text" name="email" className="emailInput" onChange={changeEmail} size={25} required />
                        <br />
                        <label className="passwordItem">
                            <b>
                                Password:&nbsp;
                            </b>
                        </label>
                        <input type="password" name="password" className="passwordInput" onChange={changePassword} size={25} required />
                        <br />
                        <button type="button" className="loginButton" onClick={() => LogInUser()}>Log In</button>
                    </form>
                    <div className="createAccount">Don't have an account?&nbsp;
                        <a href="/create-account">Create one!</a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Login;
