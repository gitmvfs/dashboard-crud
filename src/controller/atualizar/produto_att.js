import api from "../../service/request_api";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const atualizar_produto = (produto,id) => {

    const tamanhosSelecionados = produto.tamanho.map((option) => option.value);
    console.log(produto)
    console.log(id)
    api.put(/produto/+ id,{

        nome:produto.nome,
        preco:produto.preco,
        cor: produto.cor,
        genero: produto.genero.value,
        tipo: produto.tipo.value,
        linkFoto1:produto.fotos[0],
        linkFoto2:produto.fotos[1],
        linkFoto3:produto.fotos[2],
        descricao:produto.descricao,
        categoriaNome: produto.categoria.value,
        tamanhos: tamanhosSelecionados

    })
    .then(() => {
      Swal.fire({
        title: "Atualizado com sucesso",
        type: "success",
        showCancelButton: false,
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
        timer: 3000, // Tempo em milissegundos (3 segundos)
        timerProgressBar: true,
      }).then(() => {
      });
    })
    .catch((error) => {
      Swal.fire("Erro ao atualizar", error, "error");
    });
};

export default  atualizar_produto