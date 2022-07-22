import { useRef, useState, useEffect, useContext } from "react";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import AuthContext from "../context/AuthProvider";
import userService from "../service/user-service";

import './Signup.css'

const EMAIL_REGEX = /^[a-zA-Z0-9\.-_]{3,}@\w+\.(com|bg)$/;

const Signup = () => {
    const errorRef = useRef();
    
    const { isLogged, role } = useContext(AuthContext);

    const [firstName, setFirstName] = useState('');
    const [validFirstName, setValidFirstName] = useState(false);
    const [firstNameFocus, setFirstNameFocus] = useState(false);

    const [lastName, setLastName] = useState('');
    const [validLastName, setValidLastName] = useState(false);
    const [lastNameFocus, setLastNameFocus] = useState(false);

    const [password, setPassword] = useState('');
    const [validPassword, setValidPassword] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);

    const [email, setEmail] = useState('');
    const [validEmail, setValidEmail] = useState(false);
    const [emailFocus, setEmailFocus] = useState(false);

    const [matchPassword, setMatchPassword] = useState('');
    const [validMatchPassword, setValidMatchPassword] = useState(false);
    const [matchPasswordFocus, setMatchPasswordFocus] = useState(false);

    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setValidFirstName(firstName.length > 2);
        setValidLastName(lastName.length > 2);
    }, [firstName, lastName])

    useEffect(() => {
        setValidEmail(EMAIL_REGEX.test(email));
    }, [email])

    useEffect(() => {
        setValidPassword(password.length > 10);
        setValidMatchPassword(password === matchPassword);
    }, [password, matchPassword])

    const handleSubmit = (e) => {
        e.preventDefault();
        
        userService.signup({ firstName, lastName, email, password, rePassword: matchPassword })
        .then(response => {
            role = response?.data?.role
            isLogged = true
            setErrorMessage('')
            document.location.pathname = '/'
        })
        .catch(err => {
            console.log(err)
            setErrorMessage(err?.response?.data?.message || "Sign Up Failed")
            errorRef.current.focus();
        });
    }

    return (
        <div className="Signup">
        <section>
            <p ref={errorRef} className={errorMessage ? "errorMessage" : "offscreen"} aria-live="assertive">{errorMessage}</p>
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>

                {/*First Name*/}

                <label htmlFor="firstName">
                    FirstName:
                    <FontAwesomeIcon icon={faCheck} className={validFirstName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validFirstName || !firstName ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="firstName"
                    autoComplete="off"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                    required
                    aria-invalid={validFirstName ? "false" : "true"}
                    aria-describedby="firstNamenote"
                    onFocus={() => setFirstNameFocus(true)}
                    onBlur={() => setFirstNameFocus(false)}
                />
                <p id="firstNamenote" className={firstNameFocus && firstName && !validFirstName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    First Name should be at least 2 characters<br />
                </p>

                {/*Last Name*/}

                <label htmlFor="lastName">
                    LastName:
                    <FontAwesomeIcon icon={faCheck} className={validLastName ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validLastName || !lastName ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="lastName"
                    autoComplete="off"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                    required
                    aria-invalid={validLastName ? "false" : "true"}
                    aria-describedby="lastNamenote"
                    onFocus={() => setLastNameFocus(true)}
                    onBlur={() => setLastNameFocus(false)}
                />
                <p id="lastNamenote" className={lastNameFocus && lastName && !validLastName ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Last Name should be at least 2 characters<br />
                </p>

                {/*Email*/}

                <label htmlFor="email">
                    Email:
                    <FontAwesomeIcon icon={faCheck} className={validEmail ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validEmail || !email ? "hide" : "invalid"} />
                </label>
                <input
                    type="text"
                    id="email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                    required
                    aria-invalid={validEmail ? "false" : "true"}
                    aria-describedby="emailnote"
                    onFocus={() => setEmailFocus(true)}
                    onBlur={() => setEmailFocus(false)}
                />
                <p id="emailnote" className={emailFocus && !validEmail ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Email is not valid<br />
                </p>

                {/*Password*/}

                <label htmlFor="password">
                    Password:
                    <FontAwesomeIcon icon={faCheck} className={validPassword ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validPassword || !password ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    aria-invalid={validPassword ? "false" : "true"}
                    aria-describedby="passwordnote"
                    onFocus={() => setPasswordFocus(true)}
                    onBlur={() => setPasswordFocus(false)}
                />
                <p id="passwordnote" className={passwordFocus && !validPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Password should be at least 10 symbols<br />
                </p>

                {/*Confirm Password*/}

                <label htmlFor="confirm_password">
                    Confirm Password:
                    <FontAwesomeIcon icon={faCheck} className={validMatchPassword && matchPassword ? "valid" : "hide"} />
                    <FontAwesomeIcon icon={faTimes} className={validMatchPassword || !matchPassword ? "hide" : "invalid"} />
                </label>
                <input
                    type="password"
                    id="confirm_password"
                    onChange={(e) => setMatchPassword(e.target.value)}
                    value={matchPassword}
                    required
                    aria-invalid={validMatchPassword ? "false" : "true"}
                    aria-describedby="confirmPasswordnote"
                    onFocus={() => setMatchPasswordFocus(true)}
                    onBlur={() => setMatchPasswordFocus(false)}
                />
                <p id="confirmPasswordnote" className={matchPasswordFocus && !validMatchPassword ? "instructions" : "offscreen"}>
                    <FontAwesomeIcon icon={faInfoCircle} />
                    Must match the first password input field
                </p>

                <button disabled={
                    !validFirstName
                        || !validLastName
                        || !validPassword
                        || !validEmail
                        || !validMatchPassword ? true : false}>Sign Up</button>
            </form>
            <p>
                Already registered?<br />
                <span className="line">
                    {/*put router link here*/}
                    <a href="#">Sign In</a>
                </span>
            </p>
        </section>
        </div>
    )
}

export default Signup