import React from 'react';
import Navigation from "../navigation/Navigation";
import { AuthProvider } from '../context/AuthProvider';

function App() {
    return (
        <AuthProvider>
            <div className="App">
                <Navigation />
            </div>
        </AuthProvider>
    );
}

export default App;