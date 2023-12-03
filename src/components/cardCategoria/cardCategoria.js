import axios from "axios";
import "./cardCategoria.css";
import { useState, useEffect } from "react";
import api from "../../service/request_api";

//import filtros
import FiltrarCards from "../../controller/filtrar_card";
import LimparFiltro from "../../controller/limpar_filtro";
import { formatarDataBr } from "../../controller/data_formatada";
// import imagens

import delete_icon from "../../images/icons/cardProduto/delete.svg";
import edit_icon from "../../images/icons/cardProduto/edit.svg";
import view_icon from "../../images/icons/cardProduto/view.svg";
import Swal from "sweetalert2";

const confirmarDelete = (id) => {
  // Lógica para confirmar a exclusão

  Swal.fire({
    title: "Você tem certeza?",
    text: "Esta ação não pode ser revertida!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sim, confirmar!",
  }).then((result) => {
    if (result.isConfirmed) {
      // Se o usuário confirmou, faça a requisição para a API
      api.delete("/categoria/" + id).then(() => {
        window.location.reload();
      });
    }
  });
};
function CardCategoria() {
  // Guarda os valores do array gerado pela API
  const [data, setData] = useState([]);

  //Guarda os valores do input Filtro
  const [valorInput, setValorInput] = useState("");

  //Guarda a nova lista (caso filtrada)
  const [dataFiltro, setDataFiltro] = useState([]);

  //Define o valor do input Filtro
  const handleInputChange = (event) => {
    setValorInput(event.target.value);
  };

  // Antes do site carregar ele faz uma requisição para a api
  useEffect(() => {
    api
      .get("/categoria")
      .then(async (res) => {
        await setData(res.data); // Caso a requisição tenha dado certo ele guarda no data
        await setDataFiltro(res.data);
        console.log(res.data); // Testa no console a resposta da api
      })
      .catch((err) => alert("Erro inesperado: " + err)); // Caso tenha gerado algum erro no processo ele da um alerta com o erro
  }, []);

  // Parte que vai ser renderizada
  return (
    <div className="filtro-div">
      <center className="mt-5">
        <input
          className="barra"
          type="text"
          value={valorInput}
          onInput={handleInputChange}
          placeholder="Digite o nome da categoria"
        />
        <div className="butoes">
          <button
            className="butaocor"
            onClick={() =>
              FiltrarCards(valorInput, valorInput, data, setDataFiltro)
            }
            placeholder="Digite o nome"
          >
            Filtrar
          </button>
          <button
            className="butaocor"
            onClick={() => LimparFiltro(setValorInput, setDataFiltro, data)}
            placeholder="Digite o nome"
          >
            Limpar Filtro
          </button>
        </div>
      </center>
      <div id="card-div">
        {dataFiltro.map((props) => (
          <div className="card-container">
            <center>
              <h1>{props.nome}</h1>
            </center>

            <div>
              <img src={props.img} />

              <div className="opcoes-categoria">
                <a href={`/produto/editar/${props.index}`}>
                  <img src={edit_icon} alt="Editar" />
                </a>

                <img
                  onClick={() => confirmarDelete(props.index)}
                  src={delete_icon}
                  alt="Excluir"
                />
              </div>
              <div className="data-categoria">
                <label>
                  Data começo:
                  <h3>{formatarDataBr(props.inicio)}</h3>
                </label>
                <label>
                  Data final:
                  <h3>{formatarDataBr(props.fim)}</h3>
                </label>
              </div>
            </div>

            <center>
              <h2>{props.descricao}</h2>
            </center>
          </div> // final do card-container
        ))}
      </div>
    </div>
  );
}

export default CardCategoria;
