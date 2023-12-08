import "./atualizarProduto.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "../../components/layout/switchNav";
import api from "../../service/api";
import produto_put from "../../controller/produto/produto_put";
import cam from "../../images/icons/Group 75.png";
import { useParams } from "react-router-dom";

const EditarProdutoView = () => {
  const { id } = useParams();

  useEffect(() => {
    // Função assíncrona para buscar as opções da categoria
    const fetchCategorias = async () => {
      try {
        const response = await api.get("/categoria");
        // Atualiza o estado com as opções da categoria do servidor
        const nomesDasCategorias = response.data.map(
          (categoria) => categoria.nome
        );
        setCategoriasOpt(nomesDasCategorias);

        let responseProduto = await api.get("/produto/" + id);

        responseProduto = responseProduto.data[0];
        setNome(responseProduto.nome);
        setCor(responseProduto.cor);
        setPreco(responseProduto.preco);
        setTamanho((prevState) => [
          ...prevState,
          ...responseProduto.tamanhos.map((tamanho) => ({
            value: tamanho,
            label: tamanho,
          })),
        ]);
        setDescricao(responseProduto.descricao);
        setGenero({
          value: responseProduto.genero,
          label: responseProduto.genero,
        });
        setTipo({ value: responseProduto.tipo, label: responseProduto.tipo });
        setCategoria({
          value: responseProduto.fk_categoria,
          label: responseProduto.fk_categoria,
        });
        setFotos([
          responseProduto.linkFoto1,
          responseProduto.linkFoto2,
          responseProduto.linkFoto3,
        ]);
      } catch (error) {
        Swal.fire(
          "Falha ao obter dados do produto e/ou categoria",
          "",
          "error"
        );
      }
    };

    // Chama a função para buscar as opções da categoria quando o componente montar
    fetchCategorias();
  }, [id]); // O array de dependências vazio garante que a solicitação seja feita apenas uma vez, quando o componente montar

  const [tamanho, setTamanho] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");
  const [genero, setGenero] = useState("feminino");
  const [tipo, setTipo] = useState("");
  const [fotos, setFotos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState([]);
  const [categoriaOpt, setCategoriasOpt] = useState([]);

  const tamanhoOptions = [
    { value: "PP", label: "PP" },
    { value: "P", label: "P" },
    { value: "M", label: "M" },
    { value: "G", label: "G" },
    { value: "GG", label: "GG" },
    { value: "XGG", label: "XGG" },
  ];

  const tipoOptions = [
    { value: "vestido", label: "Vestido" },
    { value: "macacão", label: "Macacão" },
    { value: "calça", label: "Calça" },
    { value: "blusa", label: "Blusa" },
    { value: "camisa", label: "Camisa" },
    { value: "calçado", label: "Calçado" },
    { value: "blazer", label: "Blazer" },
    { value: "paletó", label: "Paletó" },
  ];

  const generoOptions = [
    { value: "masculino", label: "Masculino" },
    { value: "feminino", label: "Feminino" },
    { value: "unissex", label: "Unissex" },
  ];

  const handleTamanho = (selected) => {
    setTamanho(selected);
  };

  const handleCategorias = (selected) => {
    setCategoria(selected);
  };

  const handleTipo = (selected) => {
    setTipo(selected);
  };

  const handleGenero = (selected) => {
    setGenero(selected);
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    setFotos(files);
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    try {
      const tamanhosSelecionados = tamanho.map((option) => option.value);

      if (categoria.foto instanceof FileList) {
        const formDataImagens = new FormData();

        // Adiciona as fotos ao FormData usando o mesmo nome que o servidor espera ('images')
        for (let i = 0; i < fotos.length; i++) {
          formDataImagens.append("images", fotos[i]);
        }
        const cadastroImagem = await api
          .post("/imagem", formDataImagens, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resultado) => {
            produto_put(
              nome,
              preco,
              genero,
              descricao,
              tamanhosSelecionados,
              cor,
              tipo,
              resultado.data[0],
              resultado.data[1],
              resultado.data[2],
              categoria,
              id
            );
          });
      }

      // Rota axios para enviar apenas as imagens
      else {
        produto_put(
          nome,
          preco,
          genero,
          descricao,
          tamanhosSelecionados,
          cor,
          tipo,
          fotos[0],
          fotos[1],
          fotos[2],
          categoria,
          id
        );
      }
    } catch(error) {
      Swal.fire({
        title: error,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div id="formulario-produto-div">
      <Navbar />
      <center>
        <div className="body-cad">
          <h3 className="titu">Atualizar produto</h3>
          <form id="formulariocat" onSubmit={enviarFormulario}>
            <div className="ptcima">
              <div className="pat1">
                <label>Nome:</label>
                <input
                  id="idnome"
                  placeholder="Nome"
                  name="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
                <label>Cor:</label>
                <input
                  placeholder="Cor"
                  type="text"
                  name="cor"
                  value={cor}
                  onChange={(e) => setCor(e.target.value)}
                />
                <label>Preço:</label>
                <input
                  placeholder="Preço"
                  type="number"
                  name="preco"
                  value={preco}
                  onChange={(e) => setPreco(e.target.value)}
                />

                <label>Tamanho:</label>

                <Select
                  isMulti
                  options={tamanhoOptions}
                  value={tamanho}
                  onChange={handleTamanho}
                  id="tamanho"
                />
                <div id="select-div">
                  <div className="select-item">
                    <label>Tipo:</label>

                    <Select
                      options={tipoOptions}
                      value={tipo}
                      onChange={handleTipo}
                    />
                  </div>
                  <div className="select-item">
                    <label>Genero:</label>

                    <Select
                      options={generoOptions}
                      value={genero}
                      onChange={handleGenero}
                    />
                  </div>

                  <div className="select-item">
                    <label>Categoria:</label>

                    <Select
                      options={categoriaOpt.map((nome) => ({
                        value: nome,
                        label: nome,
                      }))}
                      value={categoria}
                      onChange={handleCategorias}
                    />
                  </div>
                </div>
              </div>

              <label className="upload">
                <img id="icon" src={cam} alt="carregar imagem" />
                <input
                  type="file"
                  multiple
                  isMulti
                  max={3}
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
                value={descricao}
                onChange={(e) => setDescricao(e.target.value)}
                style={{ resize: "none" }}
              />
            </div>

            <button type="submit">Atualizar</button>
          </form>
        </div>
      </center>
    </div>
  );
};

export default EditarProdutoView;
