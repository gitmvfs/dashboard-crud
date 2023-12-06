import api from "../../service/api";
import Swal from "sweetalert2";

const Categoria_put = async(categoria,linkImg,id) =>{

    await api
        .put("/categoria/" + id, {
          nome: categoria.nome,
          descricao: categoria.descricao,
          inicio: new Date(categoria.dataInicio),
          fim: new Date(categoria.dataFinal),
          img: linkImg,
        })
        .then((resultado) => {
          window.location.reload();
          
          Swal.fire({
            title: "Cadastrado",
            type: "success",
            timer: 3000,
            timerProgressBar: true,
          });

        })
        .catch((error)=>{
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
        })
}

export default Categoria_put
