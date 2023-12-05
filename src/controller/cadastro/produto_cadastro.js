import api from "../../service/request_api";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const cadastrar_produto = (nome,preco,genero,descricao,tamanhosSelecionados,cor,tipo,urlImage_1,urlImage_2,urlImage_3,categoria) => {
api
        .post("/produto", {
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
            title: "Cadastrado com sucesso",
            icon: "success",
            confirmButtonText: "OK",
            timer: 3000,
          });
        })
        .catch((err) => {
          Swal.fire({
            title: "Parametros inválidos ou produto já cadastrado.",
            icon: "warning",
            confirmButtonText: "OK",
            timer: 3000, // Tempo em milissegundos (3 segundos)
            timerProgressBar: true,
          });
        });
    }

export default cadastrar_produto