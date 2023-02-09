import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import './CreateAccount.css';

const CreateAccount= () => {

    let navigate = useNavigate();

    // form data
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // error data
    // const [nameError, setNameError] = useState(false);
    // const [emailExists, setEmailExists] = useState(false);
    // const [PasswordsDoNotMatch, setPasswordsDoNotMatch] = useState(false);

    const [errors, setErrors] = useState({
        nameError: '',
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
        passwordsDoNotMatch: '',
        other: '',
    });

    function createNewAccount() {
        let validated = validateForm();
        if(validated) {
            axios.post(`http://127.0.0.1:8000/api/create-account`, {
                name: name,
                email: email,
                password: password
            })
            .then((response) => {
                let path = `/`;
                navigate(path);
                // console.log("RESPONSE: ", response);
                setErrors(errors => ({
                    ...errors,
                    'nameError': '',
                    'emailError': '',
                    'passwordError': '',
                    'confirmPasswordError': '',
                    'passwordsDoNotMatch': '',
                    'other': ''
                }));
            })
            .catch((error) => {
                console.log("ERROR: ", error.response.data);
                setErrors(errors => ({
                    ...errors,
                    'emailError': error.response.data.message
                }));
            });
        }
    }

    function validateForm() {
        let ret = true;
        if(name.length === 0) {
            setErrors(errors => ({
                ...errors,
                'nameError': 'Name field cannot be empty.'
            }));
            ret = false;
        }
        if(email.length === 0) {
            setErrors(errors => ({
                ...errors,
                'emailError': 'Email field cannot be empty.'
            }));
            ret = false;
        }
        if(password.length === 0) {
            setErrors(errors => ({
                ...errors,
                'passwordError': 'Password field cannot be empty.'
            }))
            ret = false;
        }
        if(confirmPassword.length === 0) {
            setErrors(errors => ({
                ...errors,
                'confirmPasswordError': 'Confirm password field cannot be empty.'
            }))
            ret = false;
        }
        if(password !== confirmPassword) {
            setErrors(errors => ({
                ...errors,
                'passwordsDoNotMatch': 'Password and Confirm Password do not match.'
            }))
            ret = false;
        }
        return ret;
    }

    const changeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.currentTarget.value);
    }

    const changeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.currentTarget.value);
    }

    const changePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.currentTarget.value);
    }

    const changeConfirmPassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.currentTarget.value);
    }

    useEffect(() => {
        const handleErrors = () => {
            // setEmailExists(false);
            // setPasswordsDoNotMatch(false);
            setErrors(errors => ({
                ...errors,
                'nameError': '',
                'emailError': '',
                'passwordError': '',
                'confirmPasswordError': '',
                'passwordsDoNotMatch': '',
                'other': ''
            }));
        }
        handleErrors();
    }, [name, email, password, confirmPassword]);

    return (
        <>
            <header className="App-header">
                <h1>
                    CREATE ACCOUNT
                </h1>
            </header>
            <main>
                <div className="createAccountPage">

                    { Object.values(errors).map((error, index) => 
                        <div className="errorMessage" key={index}>
                            {error}
                        </div>
                    ) }
                    <br />
                    <form className="createAccountForm">
                        <label className="nameItem">
                            <b>
                                Name:&nbsp;
                            </b>
                        </label>
                        <input type="text" name="name" className="nameInput" onChange={changeName} size={25} required />
                        <br />
                        <label className="emailItem">
                            <b>
                                Email:&nbsp;
                            </b>
                        </label>
                        <input type="text" name="email" className="emailInput" onChange={changeEmail} required />
                        <br />
                        <label className="passwordItem">
                            <b>
                                Password:&nbsp;
                            </b>
                        </label>
                        <input type="password" name="password" className="passwordInput" onChange={changePassword} required />
                        <br />
                        <label className="confirmPasswordItem">
                            <b>
                                Confirm Password:&nbsp;
                            </b>
                        </label>
                        <input type="password" name="confirmPassword" className="confirmPasswordInput" onChange={changeConfirmPassword} required />
                        <button type="button" className="createAccountButton" onClick={() => createNewAccount()}>Create Account</button>
                    </form>
                    <div className="login">Already have an account?&nbsp;
                        <a href="/login">
                            Log in!
                        </a>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CreateAccount;
