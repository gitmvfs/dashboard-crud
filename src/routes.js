import React from "react"; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useContext } from "react";

// Import das telas
import MainView from "./views/main/main";
import CadastroCategoriaView from "./views/categoriaPost/formCategoria";
import EditarCategoriaView from "./views/categoriaPut/formCategoria";
import CadastroProdutoView from "./views/produtoPost/cadastroProduto";
import ProdutoVisualizarView from "./views/produtoVisualizar/tProduto";

const AppRotas = () => {
    return (
        <BrowserRouter>
                <Routes>

                    <Route path="/" element={<MainView />}  />
                   
                    <Route path="/categoria/cadastro" element={<CadastroCategoriaView />}  />
                    <Route path="/categoria/editar/:id" element ={<EditarCategoriaView/>}/>
                    
                    <Route path="/produto/cadastro" element ={<CadastroProdutoView/>}/>
                    <Route path="/produto/visualizar" element ={<ProdutoVisualizarView/>}/>
                    {/* <Route path="/categoria/editar/:id" element ={<EditarCategoriaView/>}/> */}
                    

                </Routes>
        </BrowserRouter>
    );
}

export default AppRotas;
