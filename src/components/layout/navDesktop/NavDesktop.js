import React from "react";
import './NavDesktop.css'
import { Link, animateScroll as scroll } from "react-scroll";


function NavDesktop(){

 

  return(

    <>
      
      <nav className="nav-header">
          <a href="/categoria/cadastro" class="h1">+ Categoria</a>
          
          <a  href="/produto/cadastro" class="h1">+ Produto</a>
      </nav>
        <h3 id="deslogar">Deslogar</h3>

    </>


  )
}



export default NavDesktop