import "./tProduto.css";
import Navbar from "../../components/layout/switchNav";
// import Footer from "../../components/footer/footer";

import { useParams } from "react-router-dom";
import React, { useRef, useState, useEffect } from "react";
import api from "../../service/api";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

// import required modules
import { Scrollbar } from "swiper/modules";

const VisualizarProdutoView = () => {
  const { id } = useParams();

  const [tamanho, setTamanho] = useState([]);
  const [nome, setNome] = useState("");
  const [preco, setPreco] = useState("");
  const [cor, setCor] = useState("");
  const [fotos, setFotos] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [categoria, setCategoria] = useState([]);

  useEffect(() => {
    api.get("/produto/" + id).then((resultado) => {
      resultado = resultado.data[0];
      console.log(resultado);

      setFotos([resultado.linkFoto1, resultado.linkFoto2, resultado.linkFoto3]);
      setNome(resultado.nome);
      setPreco(resultado.preco);
      setCor(resultado.cor);
      setDescricao(resultado.descricao);
      setTamanho(resultado.tamanhos);
      setCategoria(resultado.fk_categoria);
    });
  }, [id]);

  return (
    <>
      <Navbar />
      <center>
        <div className="body-dash" id="produto-visualizar">
          <section id="carrossel">
            <Swiper
              scrollbar={{
                hide: false,
              }}
              modules={[Scrollbar]}
              className="mySwiper"
            >
              {/* Para cada imagem cria um swiperSlide */}
              {fotos.length > 0 ? (
                fotos.map((foto) => (
                  <>
                    {foto !== "undefined" ? (
                      <SwiperSlide>
                        <img className="img" alt="imgslide" src={foto} />
                      </SwiperSlide>
                    ) : (
                      <></>
                    )}
                  </>
                ))
              ) : (
                <>
                  <h1>errado</h1>
                </>
              )}
            </Swiper>

            <div></div>
          </section>
          <div className="informacoes">
            <h1 className="nome">{nome}</h1>
            <h3 className="categoria">Categoria: {categoria}</h3>
            <div className="infos">
              <p className="infoprod">
                <div className="tamanhos">
                  <b>Tamanhos:</b>

                  <div className="tamanhos-div">

                    {/* Para cada tamanho cria um class name tamanho */}
                    {tamanho.length > 0 ?
                        (tamanho.map ((tamanho)  => (
                            <h5 className="tamanho">{tamanho}</h5>
                   

                        ))

                        ):
                        <>
                        
                        </>
                    }
                  </div>
                </div>
                <div className="cores">
                <b>Cor:</b>

                  <h5 className="cor">{cor}</h5>
                </div>
                <div className="descricao">
                  <b>Descrição</b>
                  <p className="desc"> {descricao}</p>
                </div>
                <div className="preco">
                  <b>Preço:</b>
                  <div className="dados">R${preco}</div>
                </div>
              </p>
            </div>
          </div>
        </div>
      </center>
      {/* <Footer/>   */}
    </>
  );
};

export default VisualizarProdutoView;
