import React, { useState } from 'react';
import './cadastroCategoria.css';

const CadastroCategoria = () => {

 const [nome, setNome] = useState('');
 const [dataInicio, setDataInicio] = useState('');
 const [dataFinal, setDataFinal] = useState('');
 const [descricao, setDescricao] = useState('');

 const handleSubmit = (e) => {
   e.preventDefault();
   console.log('Event Name:', nome);
   console.log('Start Date:', dataInicio);
   console.log('End Date:', dataFinal);
   console.log('Description:', descricao);

    

 };

 return (
    <div className="card-container">
      <h3>Nova categoria</h3>
      <form onSubmit={handleSubmit}>
        <label>
          Nome:
          <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>
        
        <label>
          Data inicio:
          <input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} />
        </label>
        
        <label>
          Data final:
          <input type="date" value={dataFinal} onChange={(e) => setDataFinal(e.target.value)} />
        </label>
        
        <label>
          Descricao:
          <textarea value={descricao} 
          onChange={(e) => setDescricao(e.target.value)} 
          style={{ resize: 'none' }}
          
          />
        </label>

        <button type="submit">Cadastrar</button>
      </form>
    </div>
 );
};

export default CadastroCategoria;