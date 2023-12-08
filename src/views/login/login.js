import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import "./login.css"


// Importando os icones

import icon_eye from "../../images/icons/login/eye-closed.svg"
import icon_eye_closed from "../../images/icons/login/eye-closed.svg"
import mail from "../../images/icons/login/mail.svg"
import locked from "../../images/icons/login/lock.svg";


const LoginPage = () => {

    // Armazena os valores digitados pelo usuario
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const { login } =  useContext(AuthContext)
    const Navigate = useNavigate()
      
    // Libera a visibilidade da senha
    const [senhaVisivel, setSenhaVisivel] = useState({"type":"password","icon":icon_eye})

    const toggle_password= () =>{

        senhaVisivel["icon"] === icon_eye 
        ? setSenhaVisivel({"type":"text","icon":icon_eye_closed}) 
        : setSenhaVisivel({"type":"password","icon":icon_eye})
    }

    // Cria uma função (que recebe um evento) para enviar o usuario e a senha para a api/contexto
   const enviarFormulario =  async(e) => {
        e.preventDefault()    // Remove as variaveis da url do
        const emailValidation = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

        if (email.trim() === "" || senha.trim() === "") {
            Swal.fire({
                title: 'Preencha todos os dados!',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
        } 
        else if (!emailValidation.test(email)) {
            Swal.fire({
                title: 'E-mail inválido!',
                icon: 'warning',
                confirmButtonText: 'OK'
              });
        } 
        else {
            console.log('Logado')
            
            await login(email,senha)  // Integração com o meu contexto
            
             const tokenRecuperado = localStorage.getItem("token");

                if (tokenRecuperado) {
                    Navigate('/')
                } 
        }   

    }

    return (
        <div id="login-div">
        <form className="form" onSubmit={enviarFormulario}>
            <div className="input-div"> 
                 <img className="input-icon" style={{"borderRight" : "0"}} src={mail}  alt="icone"/>

                <input className="input" name="email" type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)/*Pega o valor de usuario e seta na variavel de estado usuario */} placeholder="Digite seu e-mail"/>

            </div>
            <div className="input-div"> 
            
                <img className="input-icon" style={{"borderRight" : "0"}} src={locked }  alt="icone"/>
                <input className="input-senha" style={{"borderRight" : "0"}} name="senha" type={senhaVisivel["type"]} id="senha" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="Digite sua senha"/>
           
            </div>

         
            <button className="button" type="submit"> Logar</button>

        </form>

        </div>
    );
}

export default LoginPage;