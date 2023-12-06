import React, { useState, useEffect } from "react";
import "./formCategoria.css";
import api from "../../service/api";
import Swal from "sweetalert2";
import { Navigate, useParams } from "react-router-dom";

import { formatDate, formatarDataBr } from "../../util/data_formatada";
import cam from "../../images/icons/Group 75.png";

import Categoria_put from "../../controller/categoria/categoria_put";
import Navbar from "../../components/layout/switchNav";

const EditarCategoriaView = () => {
  const { id } = useParams();

  const [loading, setLoading] = useState(true);

  const [categoria, setCategoria] = useState({
    nome: "",
    dataInicio: "",
    dataFinal: "2024-02-11",
    descricao: "",
    foto: [],
  });

  const handleFileChange = (e) => {
    const files = e.target.files;
    setCategoria((prevCategoria) => ({ ...prevCategoria, foto: files }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResponse] = await Promise.all([
          api.get("/categoria/" + id),
        ]);

        const categoriaData = categoriasResponse.data[0];

        setCategoria({
          nome: categoriaData.nome,
          dataInicio: formatDate(categoriaData.inicio),
          dataFinal: formatDate(categoriaData.fim),
          foto: [categoriaData.img],
          descricao: categoriaData.descricao,
        });
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const enviarFormulario = async (e) => {
    e.preventDefault();

    // Rota axios para enviar apenas as imagens
    try {
      if (categoria.foto instanceof FileList) {

        const formDataImagens = new FormData();

        formDataImagens.append("images", categoria.foto[0]);
        const cadastroImagem = await api.post("/imagem", formDataImagens, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        const urlImage = cadastroImagem.data[0];
        Categoria_put(categoria, urlImage, id);
      } else {
        Categoria_put(categoria, categoria.foto[0], id);
      }
    } catch (error) {

      if (error.response.status === 400) {
        error = "Pârametros inválidos, verifique os campos.";
      } else {
        error = "Erro interno do servidor.";
      }
      Swal.fire({
        title: error,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <>
      <Navbar />
      <center>
        <div className="body-cad">
          <h3 className="titu">Nova categoria</h3>
          <form id="formulariocat" onSubmit={enviarFormulario}>
            <div className="ptcima">
              <div className="pat1">
                <label>Nome:</label>
                <input
                  type="text"
                  value={categoria.nome}
                  onChange={(e) =>
                    setCategoria({ ...categoria, nome: e.target.value })
                  }
                />
                <label>Data inicio:</label>
                <input
                  type="date"
                  value={categoria.dataInicio}
                  onChange={(e) => {
                    let valor = e.target.value;
                    valor = formatDate(valor);
                    setCategoria({ ...categoria, dataInicio: valor });
                  }}
                />
                <label>Data final:</label>
                <input
                  type="date"
                  value={categoria.dataFinal}
                  onChange={(e) => {
                    let valor = e.target.value;
                    valor = formatDate(valor);
                    setCategoria({ ...categoria, dataFinal: valor });
                  }}
                />
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
              <label>Descricao:</label>
              <textarea
                className="desc"
                value={categoria.descricao}
                onChange={(e) =>
                  setCategoria({ ...categoria, descricao: e.target.value })
                }
                style={{ resize: "none" }}
              />
            </div>

            <button type="submit">Cadastrar</button>
          </form>
        </div>
      </center>
    </>
  );
};

export default EditarCategoriaView;
