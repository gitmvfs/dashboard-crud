import React, { useState } from 'react';
import './cadastroCategoria.css';
import axios from "axios"
import Swal from "sweetalert2";
import formatDate from "../../controller/data_formatada";
import Header from "../../components/layout/header/headerSemFiltro";
import cam from "../../images/icons/Group 75.png"

const CadastroCategoria = () => {

 const [nome, setNome] = useState('');
 const [dataInicio, setDataInicio] = useState('');
 const [dataFinal, setDataFinal] = useState('');
 const [descricao, setDescricao] = useState('');
 const [fotos, setFotos] = useState([]);

 const handleFileChange = (e) => {
  const files = e.target.files;
  setFotos(files);
};

const enviarFormulario = async (e) => {
  e.preventDefault();

  console.log(dataFinal)
  console.log(dataInicio)

  const formDataImagens = new FormData();

  // Adiciona as fotos ao FormData usando o mesmo nome que o servidor espera ('images')
  for (let i = 0; i < fotos.length; i++) {
    formDataImagens.append('images', fotos[i]);
  }

  // Rota axios para enviar apenas as imagens
  try {
   
    const cadastroImagem = await axios.post('http://localhost:3000/imagem/inserir', formDataImagens, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const urlImage = cadastroImagem.data[0]

 

    const cadastroCategoria = await axios.post("http://localhost:3000/categoria", {

    nome:nome,
    descricao:descricao,
    inicio:new Date(dataInicio),
    fim:new Date(dataFinal),
    img:urlImage

    })

    console.log(cadastroCategoria)
  }
  catch(error){

    Swal.fire({
      title: error,
      icon: 'warning',
      confirmButtonText: 'OK'
    });

    console.log(error)
  }
}

 return (
  <div>
    <Header/>
    <div className='body-cad'>
      <div className="card-container">
        <h3 className='titu'>Nova categoria</h3>
        <form id='formulariocat' onSubmit={enviarFormulario}>
          <div className='ptcima'>
          <div className='pat1'>
            <label>
              Nome:
              <input  type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
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
          
          <label className='upload'>
            <img  id="icon" src={cam} alt='carregar imagem' />
            <input
              type="file"
              id="fotos"
              name="fotos"
              accept="image/*"
              onChange={handleFileChange}
            />
          </label>
          
          </div>
          

          <div className='pat3'>
          <label >
              Descricao:
              <textarea className='desc' value={descricao} 
              onChange={(e) => setDescricao(e.target.value)} 
              style={{ resize: 'none' }}
              
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

export default CadastroCategoria;