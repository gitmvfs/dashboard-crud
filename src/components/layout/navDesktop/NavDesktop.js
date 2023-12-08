import React, { useContext } from "react";
import './NavDesktop.css'
import { Link, animateScroll as scroll } from "react-scroll";
import { AuthContext } from '../../../contexts/auth'


function NavDesktop(){

  const { logout } = useContext(AuthContext);

  const deslogar = () => {
      logout();
  };

  return(

    <>
      
      <nav className="nav-header">
        
          <a href="/" class="h1">Inicio</a>
          <a href="/categoria/cadastro" class="h1">+ Categoria</a>
          <a  href="/produto/cadastro" class="h1">+ Produto</a>
      
      </nav>
        <h3 id="deslogar" onClick={ deslogar }>Deslogar</h3>

    </>


  )
}



export default NavDesktop