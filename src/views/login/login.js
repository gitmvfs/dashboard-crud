import React, { useState, useContext } from "react";
import { AuthContext } from "../../hooks/auth_login";
import { Link } from "react-router-dom";
import validarFormulario from "../../controller/login_controller"

import "./login.css"

// Importando os icones



const LoginPage = () => {

    // Armazena a variavel no contexto
    const { login } = useContext(AuthContext);

    // Armazena os valores digitados pelo usuario
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    // Libera a visibilidade da senha
    const [senhaVisivel, setSenhaVisivel] = useState(false)



    // Cria uma função (que recebe um evento) para enviar o usuario e a senha para a api/contexto
    function enviarFormulario (e){
        const token = validarFormulario(usuario,senha)  // Integração com o meu contexto

        

        //login(usuario, token) 
    }


    return (
        <div id="login-div">
        <form className="form" onSubmit={enviarFormulario}>
                <input className="input" name="email" type="text" id="email" value={usuario} onChange={(e) => setUsuario(e.target.value)/*Pega o valor de usuario e seta na variavel de estado usuario */} placeholder="Digite seu e-mail"/>
    
                <input className="input" name="senha" type="password" id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha"/>

                <button className="button" type="submit"> Logar</button>
        </form>
        </div>
    );
}

export default LoginPage;