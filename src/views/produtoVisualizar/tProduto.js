import "./tProduto.css";
import Navbar from "../../components/layout/switchNav"
// import Footer from "../../components/footer/footer";

import image1 from "../../images/carrossel/img1.webp";
import image2 from "../../images/carrossel/img2.webp";
import image3 from "../../images/carrossel/img3.webp";

import React, { useRef, useState } from 'react';
// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/scrollbar';


// import required modules
import { Scrollbar } from 'swiper/modules';

const ProdutoVisualizarView = () => {

    return(
        <>
            <Navbar/>
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
                        <SwiperSlide><img className="img" alt="imgslide" src={image1}/></SwiperSlide>
                        <SwiperSlide><img className="img" alt="imgslide" src={image2}/></SwiperSlide>
                        <SwiperSlide><img className="img" alt="imgslide" src={image3}/></SwiperSlide>
                    </Swiper>

                    <div >

                    </div>
                </section>
                    <div className="informacoes">
                        <h1 className="nome">Nome da Roupa</h1>
                        <h3 className="categoria">Categoria: Verao</h3>
                        <div className="infos">
                            
                            <p className="infoprod">
                                
                                <div className="tamanhos">
                                    <b>Tamanhos:</b>    
                                        <div className="tamanhos-div">
                                            <h5 className="tamanho">PP</h5>
                                            <h5 className="tamanho">P</h5>
                                            <h5 className="tamanho">M</h5>
                                            <h5 className="tamanho">G</h5>
                                            <h5 className="tamanho">GG</h5>
                                            <h5 className="tamanho">XGG</h5>
                                        </div>
                                </div>
                                <b>Cores:</b>
                                <div className="cores">
                                    <h5 className="cor">Vermelho</h5>
                                </div>
                                <div className="descricao">
                                <b >Descrição</b>
                                <p className="desc">Lorem ipsum dolor sit amet. Qui dolore culpa sed natus fuga aut placeat repudiandae et nesciunt maxime. Quo asperiores optio non provident illo aut quae tenetur in odio galisum non ullam culpa. Est blanditiis commodi et enim exercitationem ut nesciunt veniam eum doloremque omnis.</p>
                                </div>
                                <div className="preco"><b>Preço:</b><div className="dados">R$10000</div></div>
                            </p>
                            
                        </div>
                        
                    </div>
                    
                </div>
                </center>
            {/* <Footer/>   */}
        </>

    )

}

export default ProdutoVisualizarView;