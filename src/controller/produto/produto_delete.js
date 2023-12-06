import api from "../../service/api";
import Swal from "sweetalert2";

export default function ConfirmarDelete  (id)  {
    // Lógica para confirmar a exclusão
  
    Swal.fire({
      title: "Você tem certeza?",
      text: "Esta ação não pode ser revertida!",
      icon: "warning",
      showCancelButton: true,
      cancelButtonColor: "#3085d6",
      confirmButtonColor: "#d33",
      confirmButtonText: "Deletar Produto!",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Se o usuário confirmou, faça a requisição para a API
        api.delete("/produto/" + id).then(() => {
          window.location.reload();
        });
      }
    });
  };