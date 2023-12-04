import "./cadastroProduto.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import Header from "../../components/layout/header/headerSemFiltro";
import api from "../../service/request_api";
import cadastrar_produto from "../../controller/produto_cadastro";
import cam from "../../images/icons/Group 75.png"

const CadastroProduto = () => {
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
      } catch (error) {
        console.error("Erro ao obter opções de categoria:", error);
      }
    };

    // Chama a função para buscar as opções da categoria quando o componente montar
    fetchCategorias();
  }, []); // O array de dependências vazio garante que a solicitação seja feita apenas uma vez, quando o componente montar

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

    const formDataImagens = new FormData();

    // Adiciona as fotos ao FormData usando o mesmo nome que o servidor espera ('images')
    for (let i = 0; i < fotos.length; i++) {
      formDataImagens.append("images", fotos[i]);
    }

    // Rota axios para enviar apenas as imagens
    try {
      const cadastroImagem = await api.post("/imagem",
        formDataImagens,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const urlImage_1 = cadastroImagem.data[0];
      const urlImage_2 = cadastroImagem.data[1];
      const urlImage_3 = cadastroImagem.data[2];

      // Cria um map com os valores dos tamanhos
      const tamanhosSelecionados = tamanho.map((option) => option.value);
     
      cadastrar_produto(nome,preco,genero,descricao,tamanhosSelecionados,cor,tipo,urlImage_1,urlImage_2,urlImage_3,categoria)
      
    } catch (err) {
      Swal.fire({
        title: err,
        icon: "warning",
        confirmButtonText: "OK",
      });
    }
  };

  return (
    <div id="formulario-produto-div">
      <Header />

      <form onSubmit={enviarFormulario}>
        <input
          id="idnome"
          placeholder="Nome"
          name="nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />

        <input
          placeholder="Preço"
          name="preco"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
        />

        <input
          placeholder="Cor"
          name="cor"
          value={cor}
          onChange={(e) => setCor(e.target.value)}
        />

        <Select options={tipoOptions} value={tipo} onChange={handleTipo} />

        <Select
          options={generoOptions}
          value={genero}
          onChange={handleGenero}
        />

        <Select
          isMulti
          options={tamanhoOptions}
          value={tamanho}
          onChange={handleTamanho}
        />

        <Select
          options={categoriaOpt.map((nome) => ({ value: nome, label: nome }))}
          value={categoria}
          onChange={handleCategorias}
        />

        <label className="upload ">
          <img id="icon" src={cam} alt="carregar imagem" />
          <input
            type="file"
            id="fotos"
            name="fotos"
            accept="image/*"
            multiple
            onChange={handleFileChange}
          />
        </label>
        <textarea
          id="desc"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={5}
          style={{ resize: "none" }}
          placeholder="descricao"
        />

        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
};

export default CadastroProduto;
