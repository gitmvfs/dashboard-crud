import axios from "axios";
import Swal from "sweetalert2";

const validarFormulario = (usuario,senha) => {

    console.log("Chamou validação")

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
        axios.post('http://localhost:3000/login',{ // Mudar a url para a da API
            email:usuario,
            senha:senha
        })
        .then((response) =>{
            const token = response.data.token
           
            return token
        })
        .catch((erro) => {
            // Tratar os erros caso necessario (ex. erro 404)
            console.log(erro)
        }); 
    }
}

export default validarFormulario;