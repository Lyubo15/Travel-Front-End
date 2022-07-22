import { createContext, useState } from "react";

const AuthContext = createContext({ isLogged: false, role: 'USER' });

export const AuthProvider = ({ children }) => {

    return (
        <AuthContext.Provider value={{ isLogged: false, role: 'USER' }}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext;
