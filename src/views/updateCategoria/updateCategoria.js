import React, { useState, useEffect } from "react";
import "./updateCategoria";
import axios from "axios";
import Swal from "sweetalert2";
import { formatDate } from "../../controller/data_formatada";
import { useParams, useNavigate } from "react-router-dom";

import api from "../../service/request_api";
import atualizar_categoria from "../../controller/categoria";

import Header from "../../components/layout/header/headerSemFiltro";
import cam from "../../images/icons/Group 75.png";

const UpdateCategoria = () => {
  const Navigate = useNavigate();
  const { id } = useParams();

  const [nome, setNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [dataFinal, setDataFinal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [fotos, setFotos] = useState([]);
  const [urlFoto, setUrl] = useState("");

  useEffect(() => {
    const buscarCategoria = async () => {
      try {
        const response = await api.get("/categoria/" + id);
        const categoria = response.data[0];

        setNome(categoria.nome);
        setDescricao(categoria.descricao);
        setDataInicio(formatDate(new Date(categoria.inicio)));
        setDataFinal(formatDate(new Date(categoria.fim)));
        setUrl(categoria.img);
      } catch (error) {
        console.log(error);
        const erro = new String(error);
        Swal.fire("Erro:", erro, "error");
      }
    };

    buscarCategoria();
  }, [id]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFotos(files);
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    Swal.fire({
      title: "Tem certeza?",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#96F299",
      confirmButtonText: "Atualizar",
      cancelButtonText: "Cancelar",
      closeOnConfirm: false,
      closeOnCancel: false,
    }).then((result) => {
      if (result.isConfirmed) {
        let link_url = urlFoto;

        if (fotos[0] !== undefined) {
          const recuperarLink = async () => {
            const formDataImagens = new FormData();

            // Adiciona as fotos ao FormData usando o mesmo nome que o servidor espera ('images')
            formDataImagens.append("images", fotos[0]);

            await api
              .post("/imagem", formDataImagens, {
                headers: {
                  "Content-Type": "multipart/form-data",
                },
              })
              .then((resposta) => {
                link_url = resposta.data[0];
                atualizar_categoria(
                  nome,
                  descricao,
                  dataInicio,
                  dataFinal,
                  link_url,
                  id
                );
              })
              .then(() => {
                Navigate("/");
              });
          };
          recuperarLink();
        } else {
          atualizar_categoria(
            nome,
            descricao,
            dataInicio,
            dataFinal,
            link_url,
            id
          );
          Navigate("/");
        }
      } else {
        Swal.fire("Operação cancelada com sucesso", "error");
      }
    });
  };

  return (
    <div>
      <Header />
      <div className="body-cad">
        <div className="card-container">
          <h3 className="titu">Nova categoria</h3>
          <form id="formulariocat" onSubmit={enviarFormulario}>
            <div className="ptcima">
              <div className="pat1">
                <label>
                  Nome:
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </label>

                <label>
                  Data inicio:
                  <input
                    type="date"
                    value={dataInicio}
                    onChange={(e) => setDataInicio(formatDate(e.target.value))}
                  />
                </label>

                <label>
                  Data final:
                  <input
                    type="date"
                    value={dataFinal}
                    onChange={(e) => setDataFinal(formatDate(e.target.value))}
                  />
                </label>
              </div>

              <label className="upload">
                <img id="icon" src={cam} alt="carregar imagem" />
                <input
                  type="file"
                  id="fotos"
                  name="fotos"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="pat3">
              <label>
                Descricao:
                <textarea
                  className="desc"
                  value={descricao}
                  onChange={(e) => setDescricao(e.target.value)}
                  style={{ resize: "none" }}
                />
              </label>
            </div>

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateCategoria;
