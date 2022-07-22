import React, { Fragment } from "react";
import { useContext } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Signup from '../signup/Signup';
import Home from "../home/Home";
import AuthContext from "../context/AuthProvider";
import City from "../city/City";

const Navigation = () => {

    const { isLogged } = useContext(AuthContext);

    return (
        <Router>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/cities' exact element={<SecureRoute isLogged={isLogged}><City /></SecureRoute>} />
                <Route path='/user/signup' exact element={<NotSecureRoute isLogged={isLogged}><Signup /></NotSecureRoute>} />
            </Routes>
        </Router>
    )
};

const SecureRoute = (props) => {
    if (props.isLogged) {
        return props.children
    }

    return <Navigate to='/user/signup' />
}

const NotSecureRoute = (props) => {
    if (!props.isLogged) {
        return props.children
    }

    return <Navigate to='/' />
}

export default Navigation
