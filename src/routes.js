import React from "react"; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

// Import das telas
import MainView from "./views/main/main";
import CadastroCategoriaView from "./views/categoriaPost/formCategoria";

const AppRotas = () => {
    return (
        <BrowserRouter>
                <Routes>

                    <Route path="/" element={<MainView />}  />
                    <Route path="/categoria/cadastro" element={<CadastroCategoriaView />}  />

                </Routes>
        </BrowserRouter>
    );
}

export default AppRotas;
