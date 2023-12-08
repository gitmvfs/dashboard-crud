import api from "../../service/api";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const cadastrar_produto = (nome,preco,genero,descricao,tamanhosSelecionados,cor,tipo,urlImage_1,urlImage_2,urlImage_3,categoria,id) => {

      console.log(descricao)
api
        .put("/produto/"+id, {
          nome: nome,
          preco: preco,
          genero: genero.value,
          descricao: descricao,
          tamanhos: tamanhosSelecionados,
          cor: cor,
          tipo: tipo.value,
          linkFoto1: urlImage_1,
          linkFoto2: urlImage_2,
          linkFoto3: urlImage_3,
          categoriaNome: categoria.value,
        })
        .then((resultado) => {
          Swal.fire({
            title: "Atualizado com sucesso",
            icon: "success",
            confirmButtonText: "OK",
            timer: 3000,
          });
        })
        .catch((error) => {
          console.log(error)
          if(error.response.status === 400){
            error = "Pârametros inválidos, verifique os campos."
          }
          else{
            error = "Erro interno do servidor."
    
          }
          Swal.fire({
            title: error,
            icon: "warning",
            confirmButtonText: "OK",
          });
        });
    }

export default cadastrar_produto