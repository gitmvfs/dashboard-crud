import api from "../../service/request_api";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const atualizar_produto = (produto,foto1,foto2,foto3,id) => {

    const tamanhosSelecionados = produto.tamanho.map((option) => option.value);
    console.log(produto.fotos[0])
    console.log(id)
    api.put(/produto/+ id,{

        nome:produto.nome,
        preco:produto.preco,
        cor: produto.cor,
        genero: produto.genero.value,
        tipo: produto.tipo.value,
        linkFoto1:foto1,
        linkFoto2:foto2,
        linkFoto3:foto3,
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