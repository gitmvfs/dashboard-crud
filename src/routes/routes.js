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
import UpdateCategoria from "../views/updateCategoria/updateCategoria";
import UpdateProduto from "../views/updateProduto/updateProduto";

const AppRotas = () => {
    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path="/login" element={<Login />} />
                    {/* Rotas protegidas */}
                    <Route path="/" element={<Main />}  />
                    <Route path="/categoria/cadastro" element={<CadastroCategoria  />} />
                    <Route path="/categoria/editar/:id" element= {<UpdateCategoria />} />
                 
                    <Route path="/produto/cadastro" element={ <CadastroProduto />}  />
                    <Route path="/produto/view/:id" element= {<ProdutoView />} />
                    <Route path="/produto/editar/:id" element= {<UpdateProduto />} />
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
