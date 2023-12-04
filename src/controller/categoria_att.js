import api from "../service/request_api";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

const atualizar_categoria = (
  nome,
  descricao,
  dataInicio,
  dataFinal,
  link_url,
  id
) => {
  api
    .put(
      "/categoria/" + id,
      {
        nome: nome,
        descricao: descricao,
        inicio: new Date(dataInicio),
        fim: new Date(dataFinal),
        img: link_url,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
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

export default  atualizar_categoria