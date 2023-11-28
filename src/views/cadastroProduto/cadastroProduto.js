import "./cadastroProduto.css";
import React, { useState } from 'react';
import Select from 'react-select';

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

  const handleSelectChange = (selected) => {
    setSelectedOptions(selected);
  };

  const enviarFormulario = (e) => {
    e.preventDefault();

    // Recupera os valores dos inputs
    console.log('Nome:', nome);
    console.log('Preço:', preco);
    console.log('Cor:', cor);
    console.log('Gênero:', genero);
    console.log('Tipo:', tipo);
    console.log('Tamanhos selecionados:', selectedOptions);

    // Rota axios aqui:
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

        <button type="submit">Cadastrar</button>
      </form>
    </>
  );
};

export default CadastroProduto;