import React from "react"; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthProvider, AuthContext } from "./contexts/auth";

// Import das telas
import MainView from "./views/main/main";
import CadastroCategoriaView from "./views/categoriaPost/formCategoria";
import EditarCategoriaView from "./views/categoriaPut/formCategoria";
import CadastroProdutoView from "./views/produtoPost/cadastroProduto";
import VisualizarProdutoView from "./views/produtoVisualizar/tProduto";
import EditarProdutoView from "./views/produtoPut/atualizarProduto";
import Login from "./views/login/login";


const AppRotas = () => {

    const Private = ({children}) => {
        // Resgata authenticated e carregando do contexto
        const { authenticated, carregando } = useContext(AuthContext);
        // Verifica se as informações estão prontas para serem exibidas e se o usuario esta autenticado
        if(carregando) {
            return(<div className="carregando"><h2>Carregando....</h2></div>);
        }
        if(!authenticated) {
            return(
                <Navigate to="/login" />
            );
        }    
        return(children);
    };

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>    

                    <Route path="/login" element={ <Login/> } />

                    <Route path="/" element={<Private> <MainView /> </Private>}  />
                   
                    <Route path="/categoria/cadastro" element={<Private> <CadastroCategoriaView /> </Private>}  />
                    <Route path="/categoria/editar/:id" element ={<Private> <EditarCategoriaView/> </Private>}/>
                    
                    <Route path="/produto/cadastro" element ={<Private> <CadastroProdutoView/> </Private>}/>
                    <Route path="/produto/visualizar/:id" element ={<Private> <VisualizarProdutoView/> </Private>}/>
                    <Route path="/produto/editar/:id" element ={<Private> <EditarProdutoView/> </Private>}/>
                    

                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRotas;
