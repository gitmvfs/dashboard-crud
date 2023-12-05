import React, { useState } from "react";
import "./formCategoria.css";
import api from "../../service/api";
import Swal from "sweetalert2";
import { Navigate } from "react-router-dom";

import { formatDate } from "../../util/data_formatada";
import cam from "../../images/icons/Group 75.png";

import Categoria_post from "../../controller/categoria/categoria_post";
import Navbar from "../../components/layout/switchNav";

const CadastroCategoriaView = () => {

  const [categoria,setCategoria] = useState({
    nome:"",
    dataInicio: "",
    dataFinal:"01/02/2100",
    descricao:"",
    foto: []
  })
  
  const handleFileChange = (e) => {
    const files = e.target.files;
    setCategoria({fotos:files});
  };

  const enviarFormulario = async (e) => {
    e.preventDefault();

    const formDataImagens = new FormData();

      formDataImagens.append("images", categoria.foto[0]);

    // Rota axios para enviar apenas as imagens
    try {
      const cadastroImagem = await api.post("/imagem", formDataImagens, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(cadastroImagem)
      // const urlImage = cadastroImagem.data[0];
    
      // Categoria_post(categoria,urlImage)
      
    } catch (error) {
     
      if(error.response.status === 400){
        error = "Pârametros inválidos, verifique os campos."
      }
      else{
        error = "Erro interno do servidor."

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
                <label>
                  Nome:
                  
                </label>
                <input
                    type="text"
                    value={categoria.nome}
                    onChange={(e) => setCategoria({nome:e.target.value})}
                  />
                <label>
                  Data inicio:
                  
                </label>
                <input
                    type="date"
                    value={categoria.dataInicio}
                    onChange={(e) => setCategoria(formatDate({dataInicio:e.target.value}))}
                  />
                <label>
                  Data final:
                  
                </label>
                <input
                    type="date"
                    value={categoria.dataFinal}
                    onChange={(e) => setCategoria(formatDate({dataFinal:e.target.value}))}
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
              <label>
                Descricao:
               
              </label>
              <textarea
                  className="desc"
                  value={categoria.descricao}
                  onChange={(e) => setCategoria({descricao:e.target.value})}
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

export default CadastroCategoriaView;
