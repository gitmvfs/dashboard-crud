import React, { useState, createContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../service/api";
import Swal from "sweetalert2";


// Define o contexto
export const AuthContext = createContext();


// Define o contexto que faz a validação dos dados
export const AuthProvider = ({ children }) => {

    const Navigate = useNavigate();
    const [token, setToken] = useState(true)
    const [carregando, setCarregando] = useState(true);

    // Função que recebe o usuario e o token da API e salva esses dados 
    const login = (email, senha) => {

         api.put ('/admin/login',{ // Mudar a url para a da API
            email: email,
            senha: senha
           }) 
    
            .then((response) =>{
                const token = response.data
                localStorage.setItem('token', token)
                setToken(response.data)
                return token
            })
            .catch((error) => {
                if(error.response.status === 401){
                    error = "Senha incorreta"
    
                } else if (error.response.status === 404){
                    error = "Usuario não cadastrado"
    
                } else if (error.response.status === 500) {
                    error = 'Servidor fora do ar'
                }
    
                  Swal.fire({
                    title: error,
                    icon: "warning",
                    confirmButtonText: "OK",
                  });
                })
    };

    // Função para logout do usuario e limpeza dos dados no localStorage
    const logout = () => {
        console.log("logout");
        localStorage.removeItem("token");
        Navigate("/login");
    };


    const registrar = (email, senha) => {

        api.post ('/admin/login',{ // Mudar a url para a da API
            email: email,
            senha: senha
           }) 
        .then((res) =>{
            if(!res){
                Swal.fire({
                    title: 'Usuario não cadastrado',
                    icon: "warning",
                    confirmButtonText: "OK",
                  });
            } else { 
                Swal.fire({
                    title: 'Usuario cadastrado com sucesso',
                    icon: "success",
                    confirmButtonText: "OK",
                  });
            }
        })
    

    }
    // Antes da página ser renderizada, verifica se o usúario ainda esta logado no localStorage  
    useEffect(() => {
        
        const tokenRecuperado = localStorage.getItem("token");

        if (!tokenRecuperado) {
            Navigate('/login')
        } 

        setCarregando(false);
        
    }, [Navigate]);

    // Exporta os valores/variaveis para todo o sistema
    return (
        < AuthContext.Provider value={{ authenticated: !!token, carregando, login, logout, registrar }}>
            {children}
        </AuthContext.Provider>
    );
}
