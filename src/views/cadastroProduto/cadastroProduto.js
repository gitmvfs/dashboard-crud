import "./cadastroProduto.css";
import React, { useState } from 'react';
import Select from 'react-select';
import axios from "axios"

const CadastroProduto = () => {
  const opcoes = [
    { value: 'PP', label: 'PP' },
    { value: 'P', label: 'P' },
    { value: 'M', label: 'M' },
    { value: 'G', label: 'G' },
    { value: 'GG', label: 'GG' },
    { value: 'XGG', label: 'XGG' },
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);
  const [nome, setNome] = useState('');
  const [preco, setPreco] = useState('');
  const [cor, setCor] = useState('');
  const [genero, setGenero] = useState('feminino');
  const [tipo, setTipo] = useState('');
  const [fotos, setFotos] = useState([]);
  const [descricao, setDescricao] = useState('');

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
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
      formDataImagens.append('images', fotos[i]);
    }
  
    // Rota axios para enviar apenas as imagens
    try {
      const responseImagens = await axios.post('https://localhost:3001/imagem/inserir', formDataImagens, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
  
      console.log('Resposta Imagens:', responseImagens);
  
      // Se necessário, adicione lógica para extrair IDs ou outras informações relevantes da resposta da primeira rota
  
      // Agora, você pode criar um segundo FormData para os outros dados que você deseja enviar para a outra rota
      const formDataOutrosDados = new FormData();
      formDataOutrosDados.append('nome', nome);
      formDataOutrosDados.append('preco', preco);
      // Adicione outros campos conforme necessário
  
      // Rota axios para enviar os outros dados
      const responseOutrosDados = await axios.post('sua-outra-rota', formDataOutrosDados, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Resposta Outros Dados:', responseOutrosDados);
  
    } catch (error) {
      console.error('Erro:', error);
    }
  };

  return (
    <>
      <form onSubmit={enviarFormulario}>
        <input
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

        <select
          name="genero"
          value={genero}
          onChange={(e) => setGenero(e.target.value)}
        >
          <option value="feminino">Feminino</option>
          <option value="masculino">Masculino</option>
          <option value="unissex">Unissex</option>
        </select>

        <input
          placeholder="Tipo"
          name="tipo"
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
        />

        <Select
          isMulti
          options={opcoes}
          value={selectedOptions}
          onChange={handleSelectChange}
        />

        <input
          type="file"
          id="fotos"
          name="fotos"
          accept="image/*"
          multiple
          onChange={handleFileChange}
        />

        <textarea
          id="descricao"
          name="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          rows={5}
          style={{ resize: 'none' }}
          placeholder="descricao"
        />

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};

export default CadastroProduto;
