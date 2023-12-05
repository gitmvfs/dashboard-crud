import React from "react"; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

// Import das telas
import MainView from "./views/main/main";

const AppRotas = () => {
    return (
        <BrowserRouter>
                <Routes>

                    <Route path="/" element={<MainView />}  />

                </Routes>
        </BrowserRouter>
    );
}

export default AppRotas;
