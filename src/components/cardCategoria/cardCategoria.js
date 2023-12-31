import axios from "axios";
import "./cardCategoria.css";
import { useState, useEffect } from "react";
import api from "../../service/api";
import Swal from "sweetalert2";

//import filtros
import FiltrarCards from "../../util/filtros/filtrar_card";
import LimparFiltro from "../../util/filtros/limpar_filtro";
import { formatarDataBr } from "../../util/data_formatada";

// import imagens
import delete_icon from "../../images/icons/cardProduto/delete.svg";
import edit_icon from "../../images/icons/cardProduto/edit.svg";


//import das operações
import ConfirmarDelete from "../../controller/categoria/categoria_delete"

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
    <div id="categorias-div">
      <center>
      <h1>Categorias</h1>
      </center>

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
              FiltrarCards( valorInput, data, setDataFiltro)
            }
          >
            Filtrar
          </button>
          <button
            className="butaocor"
            onClick={() => LimparFiltro(setValorInput, setDataFiltro, data)}
          >
            Limpar Filtro
          </button>
        </div>
      </center>

      <div id="card-div">
        {Array.isArray(dataFiltro) && dataFiltro.length > 0 ? (
          dataFiltro.map((props) => (
            <div className="card-container" key={props.index}>
              <center>
                <h1>{props.nome}</h1>
              </center>
  
              <div>
                <img src={props.img} />
  
                <div className="opcoes-categoria">
                  <a href={`/categoria/editar/${props.index}`}>
                    <img src={edit_icon} alt="Editar" />
                  </a>
  
                  <img
                    onClick={() => ConfirmarDelete(props.index)}
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
            </div>
          ))
        ) : (
          <p>Nenhum resultado encontrado</p>
        )}
      </div>
    </div>
  );
  
}

export default CardCategoria;
