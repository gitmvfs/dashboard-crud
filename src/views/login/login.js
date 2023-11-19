import React, { useState, useContext } from "react";
import { AuthContext } from "../../hooks/auth_login";
import { Link } from "react-router-dom";
import validarFormulario from "../../controller/login_controller"

import "./login.css"

// Importando os icones

import icon_eye from "../../images/icons/eye.svg"
import icon_eye_closed from "../../images/icons/eye-closed.svg"
import mail from "../../images/icons/mail.svg"
import locked from "../../images/icons/lock.svg"


const LoginPage = () => {

    // Armazena a variavel no contexto

    // Armazena os valores digitados pelo usuario
    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    
    // Libera a visibilidade da senha
    const [senhaVisivel, setSenhaVisivel] = useState({"type":"password","icon":icon_eye})

    const toggle_password= () =>{

        senhaVisivel["icon"] === icon_eye 
        ? setSenhaVisivel({"type":"text","icon":icon_eye_closed}) 
        : setSenhaVisivel({"type":"password","icon":icon_eye})
    }

    // Cria uma função (que recebe um evento) para enviar o usuario e a senha para a api/contexto
   const enviarFormulario =  (e) => {
        const token = validarFormulario(usuario,senha)  // Integração com o meu contexto

        
    }


    return (
        <div id="login-div">
        <form className="form" onSubmit={enviarFormulario}>
            <div> 

                <input className="input" name="email" type="text" id="email" value={usuario} onChange={(e) => setUsuario(e.target.value)/*Pega o valor de usuario e seta na variavel de estado usuario */} placeholder="Digite seu e-mail"/>

            </div>
            <div> 
                
                <input className="input" name="senha" type={senhaVisivel["type"]} id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha"/>
                <img src={senhaVisivel["icon"]} alt="icone mostrar senha" onClick={toggle_password} />
            </div>
    

            <button className="button" type="submit"> Logar</button>
        </form>
        </div>
    );
}

export default LoginPage;