import React from "react"; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider } from "../hooks/auth_login";
import { AuthContext } from "../hooks/auth_login";
import { useContext } from "react";

// Import das telas
import Main from "../views/main/main";
import Login from '../views/login/login';
import CadastroProduto from "../views/cadastroProduto/cadastroProduto";
import CadastroCategoria from "../views/cadastroCategoria/cadastroCategoria";
import ProdutoView from "../views/produtoView/produtoView";

const AppRotas = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* Rotas protegidas */}
                    <Route path="/" element={<Main />}  />
                    <Route path="/produto/cadastro" element={ <CadastroProduto />}  />
                    <Route path="/categoria/cadastro" element={<CadastroCategoria  />} />
                    <Route path="/produto/view/:id" element= {<ProdutoView />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

const PrivateRoute = ({ component }) => {
    const { authenticated, carregando } = useContext(AuthContext);

    if (carregando) {
        return <div className="carregando"><h2>Carregando....</h2></div>;
    }
    if (!authenticated) {
        return <Navigate to="/login" />;
    }

    return component;
};

export default AppRotas;
