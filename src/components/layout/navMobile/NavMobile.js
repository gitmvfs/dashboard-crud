import React, {useContext} from "react";
import { useState } from "react";
import './NavMobile.css'
import { Link, animateScroll as scroll } from "react-scroll";
import { AuthContext } from '../../../contexts/auth'

function NavMobile(){
  
  const [menuAtivo, setMenuAtivo] = useState(false);

  const alternarMenu = () => {
    setMenuAtivo(!menuAtivo);
  };

  const { logout } = useContext(AuthContext);

  const deslogar = () => {
      logout();
  };
  
  return(
      <div className={`div-mobile-header ${menuAtivo ? 'open' : ''}`}>
      <div
        className={`menu-btn ${menuAtivo ? 'open' : ''}`}
        onClick={() => {alternarMenu()}}
      >
      
        <div
            className="menu-btn__burger"
        >

        </div>
      </div> 
      <nav className={`nav-mobile-header ${menuAtivo? 'visible': ''}`}>
          <a href="/" class="h1">Inicio</a>
          <a href="/categoria/cadastro" class="h1">+ Categoria</a>
          <a  href="/produto/cadastro" class="h1">+ Produto</a>
          <a  class="h1" onClick={ deslogar }>Deslogar</a>
      </nav>
      
      </div>


  )
}



export default NavMobile