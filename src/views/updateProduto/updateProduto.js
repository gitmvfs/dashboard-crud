import "./updateProduto.css";
import React, { useState, useEffect } from "react";
import Select from "react-select";
import axios from "axios";
import Swal from "sweetalert2";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../components/layout/header/headerSemFiltro";
import cam from "../../images/icons/Group 75.png";
import api from "../../service/request_api";
import atualizar_produto from "../../controller/atualizar/produto_att";

const UpdateProduto = () => {
  const { id } = useParams();
  const Navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [produto, setProduto] = useState({
    nome: "",
    preco: "",
    cor: "",
    genero: "feminino",
    tipo: "",
    fotos: [],
    descricao: "",
    categoria: [],
    tamanho: [],
  });

  const [categoriaOpt, setCategoriasOpt] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [categoriasResponse, produtoResponse] = await Promise.all([
          api.get("/categoria"),
          api.get(`/produto/${id}`),
        ]);

        setCategoriasOpt(
          categoriasResponse.data.map((categoria) => categoria.nome)
        );

        const produtoData = produtoResponse.data[0];
        setProduto({
          nome: produtoData.nome,
          preco: produtoData.preco,
          cor: produtoData.cor,
          genero: { value: produtoData.genero, label: produtoData.genero },
          tipo: { value: produtoData.tipo, label: produtoData.tipo },
          fotos: [
            produtoData.linkFoto1,
            produtoData.linkFoto2,
            produtoData.linkFoto3,
          ],
          descricao: produtoData.descricao,
          categoria: {
            value: produtoData.fk_categoria,
            label: produtoData.fk_categoria,
          },
          tamanho: produtoData.tamanhos.map((tamanhoNome) => ({
            value: tamanhoNome,
            label: tamanhoNome,
          })),
        });
      } catch (error) {
        console.error("Erro ao obter dados:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const tamanhoOptions = [
    { value: "PP", label: "PP" },
    { value: "P", label: "P" },
    { value: "M", label: "M" },
    { value: "G", label: "G" },
    { value: "GG", label: "GG" },
    { value: "XGG", label: "XGG" },
  ];

  const tipoOptions = [
    { value: "vestido", label: "vestido" },
    { value: "macacão", label: "macacão" },
    { value: "calça", label: "calça" },
    { value: "blusa", label: "blusa" },
    { value: "camisa", label: "camisa" },
    { value: "calçado", label: "calçado" },
    { value: "blazer", label: "blazer" },
    { value: "paletó", label: "paletó" },
  ];

  const generoOptions = [
    { value: "masculino", label: "masculino" },
    { value: "feminino", label: "feminino" },
    { value: "unissex", label: "unissex" },
  ];

  const handleTamanho = (selected) => {
    setProduto((prevProduto) => ({ ...prevProduto, tamanho: selected }));
  };

  const handleCategorias = (selected) => {
    setProduto((prevProduto) => ({ ...prevProduto, categoria: selected }));
  };

  const handleTipo = (selected) => {
    setProduto((prevProduto) => ({ ...prevProduto, tipo: selected }));
  };

  const handleGenero = (selected) => {
    setProduto((prevProduto) => ({ ...prevProduto, genero: selected }));
  };

  const handleFileChange = (e) => {
    setProduto((prevProduto) => ({ ...prevProduto, fotos: e.target.files }));
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    try {
      if (produto.fotos instanceof FileList) {
        const formDataImagens = new FormData();

        // Adiciona as fotos ao FormData usando o mesmo nome que o servidor espera ('images')
        for (let i = 0; i < produto.fotos.length; i++) {
          formDataImagens.append("images", produto.fotos[i]);
        }

        await api
          .post("/imagem", formDataImagens, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          })
          .then((resultado) => {

            let foto1 = resultado.data[0]
            let foto2 = resultado.data[1]
            let foto3 = resultado.data[2]

            atualizar_produto(produto,foto1,foto2,foto3, id);
         });
      } else {
        atualizar_produto(produto,produto.fotos[0],produto.fotos[1],produto.fotos[2], id);
      }
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
          value={produto.nome}
          onChange={(e) => setProduto({ ...produto, nome: e.target.value })}
        />

        <input
          placeholder="Preço"
          name="preco"
          value={produto.preco}
          onChange={(e) => setProduto({ ...produto, preco: e.target.value })}
        />

        <input
          placeholder="Cor"
          name="cor"
          value={produto.cor}
          onChange={(e) => setProduto({ ...produto, cor: e.target.value })}
        />

        <Select
          options={generoOptions}
          value={produto.genero}
          onChange={handleGenero}
        />

        <Select
          options={tipoOptions}
          value={produto.tipo}
          onChange={handleTipo}
        />

        <Select
          isMulti
          options={tamanhoOptions}
          value={produto.tamanho}
          onChange={handleTamanho}
        />

        <Select
          options={categoriaOpt.map((nome) => ({ value: nome, label: nome }))}
          value={produto.categoria}
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
          value={produto.descricao}
          onChange={(e) =>
            setProduto({ ...produto, descricao: e.target.value })
          }
          rows={5}
          style={{ resize: "none" }}
          placeholder="descricao"
        />

        <button type="submit">Atualizar</button>
      </form>
    </div>
  );
};

export default UpdateProduto;
