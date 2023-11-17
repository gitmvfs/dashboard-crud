import React, { useState, useContext } from "react";
import { AuthContext } from "../../hooks/auth_login";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./login.css"

const LoginPage = () => {

    // Armazena a variavel no contexto
    const { login } = useContext(AuthContext);

    // Armazena os valores digitados pelo usuario
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    // Cria uma função (que recebe um evento) para enviar o usuario e a senha para a api/contexto
    const enviar = (e) => {
        e.preventDefault(); // Intercepta e interrompe a ação padrão do navegador

        const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (usuario.trim() === "" || senha.trim() === "") {
            Swal.fire({
                title: 'Preencha todos os dados!',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
        } 
        else if (!emailValidation.test(usuario)) {
            Swal.fire({
                title: 'E-mail inválido!',
                icon: 'warning',
                confirmButtonText: 'OK'
              });

        } 
        else {
            axios.post('http://localhost:3000/usuario',{ // Mudar a url para a da API
                email:usuario,
                senha:senha
            })
            .then((response) =>{
                const token = response.data.token
                login(usuario, token)  // Integração com o meu contexto
                console.log("Logado")
            })
            .catch((erro) => {
                // Tratar os erros caso necessario (ex. erro 404)
                console.log(erro)
            }); 
        }
    }

    return (
        <div id="login-div">
        <form className="form" onSubmit={enviar}>
                <input className="input" name="email" type="text" id="email" value={usuario} onChange={(e) => setUsuario(e.target.value)/*Pega o valor de usuario e seta na variavel de estado usuario */} placeholder="Digite seu e-mail"/>
    
                <input className="input" name="senha" type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha"/>

                <button className="button" type="submit"> Logar</button>
        </form>
        </div>
    );
}

export default LoginPage;