import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import "./App.css";

function App() {
    const [user, setUser] = useState(null);
    const [isLoading, setLoading] = useState(true);

    useEffect(() => {
        // Get the URL parameter value
        const urlParams = new URLSearchParams(window.location.search);
        const userParam = urlParams?.get("user");

        if (userParam) {
            // Decode the URL-encoded JSON string
            const decodedUserParam = decodeURIComponent(userParam);

            // Parse the JSON string to obtain the desired format
            const userObject = JSON.parse(decodedUserParam);
            setUser(userObject);
            console.log(userObject);
        }

        setLoading(false);
    }, []);

    useEffect(() => {}, [user]);

    console.log({ user });

    return (
        <div className="container">
            {isLoading ? ( // Display a loading indicator while fetching data
                <div>Loading...</div>
            ) : (
                <Routes>
                    <Route exact path="/" element={user ? <Home user={user} /> : <Navigate to="/login" />} />
                    <Route exact path="/login" element={user ? <Navigate to="/" /> : <Login />} />
                    <Route path="/signup" element={user ? <Navigate to="/" /> : <Signup />} />
                    <Route path="*" element={user ? <Navigate to="/" /> : <Navigate to="/login" />} />
                </Routes>
            )}
        </div>
    );
}

export default App;
