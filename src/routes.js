import React from "react"; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

// Import das telas
import MainView from "./views/main/main";
import CadastroCategoriaView from "./views/categoriaPost/formCategoria";
import EditarCategoriaView from "./views/categoriaPut/formCategoria";
import CadastroProdutoView from "./views/produtoPost/cadastroProduto";
import VisualizarProdutoView from "./views/produtoVisualizar/tProduto";
import EditarProdutoView from "./views/produtoPut/atualizarProduto";

const AppRotas = () => {
    return (
        <BrowserRouter>
                <Routes>

                    <Route path="/" element={<MainView />}  />
                   
                    <Route path="/categoria/cadastro" element={<CadastroCategoriaView />}  />
                    <Route path="/categoria/editar/:id" element ={<EditarCategoriaView/>}/>
                    
                    <Route path="/produto/cadastro" element ={<CadastroProdutoView/>}/>
                    <Route path="/produto/visualizar/:id" element ={<VisualizarProdutoView/>}/>
                    <Route path="/produto/editar/:id" element ={<EditarProdutoView/>}/>
                    

                </Routes>
        </BrowserRouter>
    );
}

export default AppRotas;
