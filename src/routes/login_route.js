import React, { useContext } from "react"; 
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from '../views/login/login'
import { AuthProvider, AuthContext } from "../hooks/auth_login";

const AppRotas = () => {

    // Função para privar rotas (recebe children do contexto)
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
   
    // Definição das rotas do app
    // Usa envolve a rota com a função private para que ela só seja acessada caso o usuario esteja autenticado
    return(
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default AppRotas;